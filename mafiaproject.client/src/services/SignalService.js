import * as signalR from "@microsoft/signalr";
import SimplePeer from "simple-peer";

class SignalService {
    constructor() {
        this.connection = null;
        this.localStream = null;
        this.peers = {};
        this.lobbyName = null;
    }

    // Подключение к хабу
    async connectToHub(url) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(url)
            .withAutomaticReconnect()
            .build();

        try {
            await this.connection.start();
            console.log("SignalR connected.");
        } catch (error) {
            console.error("SignalR connection failed: ", error);
        }

        this.setupHandlers();
    }

    // Настройка обработчиков SignalR
    setupHandlers() {
        if (!this.connection) return;

        this.connection.on("ReceiveSignal", (fromConnectionId, signal) => {
            this.handleSignal(fromConnectionId, signal);
        });

        this.connection.on("UserJoined", (newConnectionId) => {
            console.log("New user joined: ", newConnectionId);
            this.createPeerConnection(newConnectionId, true);
        });

        this.connection.on("UserLeft", (connectionId) => {
            console.log("User left: ", connectionId);
            this.removePeer(connectionId);
        });

        this.connection.on("ToggleMicrophone", (enabled) => {
            this.toggleMicrophone(enabled);
        });

        this.connection.on("ToggleCamera", (enabled) => {
            this.toggleCamera(enabled);
        });
    }

    // Присоединение к лобби
    async joinLobby(lobbyName) {
        this.lobbyName = lobbyName;

        try {
            await this.connection.invoke("JoinLobby", lobbyName);
            console.log(`Joined lobby ${lobbyName}`);
            await this.setupLocalStream();
        } catch (error) {
            console.error("JoinLobby failed: ", error);
        }
    }

    // Покидание лобби
    async leaveLobby(lobbyName) {
        try {
            await this.connection.invoke("LeaveLobby", lobbyName);
            console.log(`Left lobby ${lobbyName}`);
        } catch (error) {
            console.error("LeaveLobby failed: ", error);
        }
    }

    // Настройка локального потока
    async setupLocalStream() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            // Добавление видео локального потока
            this.addVideoStream("local", this.localStream);
        } catch (error) {
            console.error("Failed to access media devices: ", error);
        }
    }

    // Создание P2P соединения
    createPeerConnection(connectionId, initiator = false) {
        const peer = new SimplePeer({
            initiator,
            stream: this.localStream,
        });

        peer.on("signal", (signal) => {
            this.connection.invoke("RelaySignal", connectionId, signal);
        });

        peer.on("stream", (stream) => {
            this.addVideoStream(connectionId, stream);
        });

        peer.on("close", () => {
            this.removePeer(connectionId);
        });

        this.peers[connectionId] = peer;
    }

    // Обработка полученного сигнала
    handleSignal(fromConnectionId, signal) {
        if (!this.peers[fromConnectionId]) {
            this.createPeerConnection(fromConnectionId, false);
        }

        const peer = this.peers[fromConnectionId];
        peer.signal(signal);
    }

    // Удаление P2P соединения
    removePeer(connectionId) {
        if (this.peers[connectionId]) {
            this.peers[connectionId].destroy();
            delete this.peers[connectionId];
        }

        // Удалить видеоэлемент
        const videoElement = document.getElementById(connectionId);
        if (videoElement) videoElement.remove();
    }

    // Добавление потока видео на страницу
    addVideoStream(connectionId, stream) {
        const videoElement = document.createElement("video");
        videoElement.id = connectionId;
        videoElement.srcObject = stream;
        videoElement.autoplay = true;
        document.getElementById("videos").append(videoElement);
    }

    // Переключение микрофона
    toggleMicrophone(enabled) {
        if (this.localStream) {
            this.localStream.getAudioTracks().forEach(track => {
                track.enabled = enabled;
            });
        }
    }

    // Переключение камеры
    toggleCamera(enabled) {
        if (this.localStream) {
            this.localStream.getVideoTracks().forEach(track => {
                track.enabled = enabled;
            });
        }
    }
}

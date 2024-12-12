import * as signalR from "@microsoft/signalr";
import SimplePeer from "simple-peer";

class SignalService {
    constructor() {
        this.connection = null;
        this.localStream = null;
        this.peers = {};
        this.lobbyName = null;
    }

    // ����������� � ����
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

    // ��������� ������������ SignalR
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

    // ������������� � �����
    async joinLobby(lobbyName) {//позволяет пользователю присоединиться к лобби
        this.lobbyName = lobbyName;

        try {
            await this.connection.invoke("JoinLobby", lobbyName);
            console.log(`Joined lobby ${lobbyName}`);
            await this.setupLocalStream();
        } catch (error) {
            console.error("JoinLobby failed: ", error);
        }
    }

    // ��������� �����
    async leaveLobby(lobbyName) {//удаляет пользователя из указанного лобби
        try {
            await this.connection.invoke("LeaveLobby", lobbyName);
            console.log(`Left lobby ${lobbyName}`);
        } catch (error) {
            console.error("LeaveLobby failed: ", error);
        }
    }

    // Запрос к камере и микрофону с сохранением локального потока
    async setupLocalStream() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            // ���������� ����� ���������� ������
            this.addVideoStream("local", this.localStream);
        } catch (error) {
            console.error("Failed to access media devices: ", error);
        }
    }

    // �������� P2P соедиенние с дургими пользователями
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

    // обработка сигнал webrtc
    handleSignal(fromConnectionId, signal) {
        if (!this.peers[fromConnectionId]) {
            this.createPeerConnection(fromConnectionId, false);
        }

        const peer = this.peers[fromConnectionId];
        peer.signal(signal);
    }

    // �������� P2P удаляет соответствующий видеоэлемент со страницы.
    removePeer(connectionId) {
        if (this.peers[connectionId]) {
            this.peers[connectionId].destroy();
            delete this.peers[connectionId];
        }

        // ������� ������������
        const videoElement = document.getElementById(connectionId);
        if (videoElement) videoElement.remove();
    }

    // Добавляет медиа-поток на страницу, создавая видео
    addVideoStream(connectionId, stream) {
        
        const videoElement = document.createElement("video");
        videoElement.id = connectionId;
        videoElement.srcObject = stream;
        videoElement.autoplay = true;
         document.getElementById("videos").append(videoElement);
    }

    // включение и выключение микрофона
    toggleMicrophone(enabled) {
        if (this.localStream) {
            this.localStream.getAudioTracks().forEach(track => {
                track.enabled = enabled;
            });
        }
    }

    // вкл выкл камера
    toggleCamera(enabled) {
        if (this.localStream) {
            this.localStream.getVideoTracks().forEach(track => {
                track.enabled = enabled;
            });
        }
    }
}

const signalService = new SignalService();
export default signalService;
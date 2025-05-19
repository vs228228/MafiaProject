import * as signalR from "@microsoft/signalr";
import SimplePeer from "simple-peer";

class SignalService {
    constructor() {
        this.connection = null;
        this.localStream = null;
        this.peers = {};
        this.playerId = null;
    }

    async connectToHub(url, playerId) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(url)
            .withAutomaticReconnect()
            .build();

        this.playerId = playerId;

        try {
            await this.connection.start();
            console.log("SignalR connected.");
        } catch (error) {
            console.error("SignalR connection failed: ", error);
        }

        this.setupHandlers();
    }

    setupHandlers() {
        if (!this.connection) return;

        this.connection.on("ReceiveSignal", (fromPlayerId, signal) => {
            this.handleSignal(fromPlayerId, signal);
        });

        this.connection.on("UserJoined", (newPlayerId) => {
            console.log("New user joined: ", newPlayerId);
            this.createPeerConnection(newPlayerId, true);
        });

        this.connection.on("ExistingUsers", (existingPlayerIds) => {
            existingPlayerIds.forEach(playerId => {
                console.log("Connecting to existing user: ", playerId);
                this.createPeerConnection(playerId, true);
            });
        });

        this.connection.on("UserLeft", (playerId) => {
            console.log("User left: ", playerId);
            this.removePeer(playerId);
        });

        this.connection.on("ToggleMicrophone", (enabled) => {
            this.toggleLocalMicrophone(enabled);
        });

        this.connection.on("ToggleCamera", (enabled) => {
            this.toggleLocalCamera(enabled);
        });
    }

    async joinLobby(lobbyName) {
        try {
            await this.connection.invoke("JoinLobby", lobbyName, this.playerId);
            console.log(`Joined lobby ${lobbyName}`);
            await this.setupLocalStream();
        } catch (error) {
            console.error("JoinLobby failed: ", error);
        }
    }

    async leaveLobby(lobbyName) {
        try {
            await this.connection.invoke("LeaveLobby", lobbyName);
            console.log(`Left lobby ${lobbyName}`);
        } catch (error) {
            console.error("LeaveLobby failed: ", error);
        }
    }

    async setupLocalStream() {
        try {
            const localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            // Отключаем локальный аудиотрек для предотвращения самослышимости
            this.localStream = localStream;
            const audioTracks = this.localStream.getAudioTracks();
            audioTracks.forEach(track => track.enabled = false);

            // Добавляем своё видео в интерфейс
            this.addVideoStream("local", this.localStream, true);
        } catch (error) {
            console.error("Failed to access media devices: ", error);
        }
    }

    createPeerConnection(playerId, initiator = false) {
        const peer = new SimplePeer({
            initiator,
            stream: this.localStream,
        });

        peer.on("signal", (signal) => {
            this.connection.invoke("RelaySignal", playerId, signal);
        });

        peer.on("stream", (stream) => {
            this.addVideoStream(playerId, stream);
        });

        peer.on("close", () => {
            this.removePeer(playerId);
        });

        this.peers[playerId] = peer;
    }

    handleSignal(fromPlayerId, signal) {
        if (!this.peers[fromPlayerId]) {
            this.createPeerConnection(fromPlayerId, false);
        }

        const peer = this.peers[fromPlayerId];
        peer.signal(signal);
    }

    removePeer(playerId) {
        if (this.peers[playerId]) {
            this.peers[playerId].destroy();
            delete this.peers[playerId];
        }

        const videoElement = document.getElementById(playerId);
        if (videoElement) videoElement.remove();
    }

    addVideoStream(playerId, stream, isLocal = false) {
        let videoElement = document.getElementById(playerId);

        if (!videoElement) {
            videoElement = document.createElement("video");
            videoElement.id = playerId;
            document.getElementById("videos").append(videoElement);
        }

        videoElement.srcObject = stream;
        videoElement.autoplay = true;

        // Добавляем локальное видео, если передан isLocal
        if (isLocal) {
            videoElement.muted = true; // Выключаем звук для локального видео
        }
    }

    toggleLocalMicrophone(enabled) {
        if (this.localStream) {
            const audioTracks = this.localStream.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = enabled;
                console.log(`Microphone ${enabled ? "enabled" : "disabled"}`);
            });
        } else {
            console.warn("Local stream is not set up, cannot toggle microphone.");
        }
    }

    toggleLocalCamera(enabled) {
        if (this.localStream) {
            const videoTracks = this.localStream.getVideoTracks();
            videoTracks.forEach(track => {
                track.enabled = enabled;
                console.log(`Camera ${enabled ? "enabled" : "disabled"}`);
            });
        } else {
            console.warn("Local stream is not set up, cannot toggle camera.");
        }
    }
}

const signalService = new SignalService();
export default signalService;

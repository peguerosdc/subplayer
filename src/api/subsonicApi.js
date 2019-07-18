
import axios from 'axios';

function build_url(endpoint, args = "") {
    return "http://192.168.0.35:8080/rest/"+endpoint+".view?u=peguerosdc&p=enc:66726f6e746d616e323132&v=1.9.0&c=myplayer&f=json"+args
}

export function getArtists() {
    const url = build_url("getArtists");
    return axios
        .get(url)
        .then(result => {
            return result["data"]["subsonic-response"]["artists"]["index"];
        });
}

export function getArtist(id) {
    const url = build_url("getArtist", "&id="+id)
    return axios
        .get(url)
        .then(result => {
            return result["data"]["subsonic-response"]["artist"];
        });
}

export function getAlbum(id) {
    const url = build_url("getAlbum", "&id="+id)
    return axios
        .get(url)
        .then(result => {
            return result["data"]["subsonic-response"]["album"];
        });
}

export function getPlaylists() {
    const url = build_url("getPlaylists");
    return axios
        .get(url)
        .then(result => {
            return result["data"]["subsonic-response"]["playlists"]["playlist"];
        });
}

export function getPlaylistById(id) {
    const url = build_url("getPlaylist", "&id="+id)
    console.log(url)
    return axios
        .get(url)
        .then(result => {
            return result["data"]["subsonic-response"]["playlist"];
        });
}
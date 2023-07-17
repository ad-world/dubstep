import operator
from app import app
from spotify_requests import spotify_get_request
from util.util import DubstepResponse, StatusResponse
import json


def get_playlists(session) -> DubstepResponse:
    url = "https://api.spotify.com/v1/me/playlists"
    data = spotify_get_request(session, url)

    response = DubstepResponse()

    if data == None:
        response.status = StatusResponse.Failure
        response.message = "Could not find playlists"
    else:
        response.status = StatusResponse.Success
        response.message = "Found playlists"
        response.data = data

    return response


def get_playlist(session, playlist_id: str) -> DubstepResponse:
    url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    data = spotify_get_request(session, url)

    response = DubstepResponse()

    if data == None:
        response.status = StatusResponse.Failure
        response.message = "Could not retrieve playlist " + playlist_id
    else:
        response.status = StatusResponse.Success
        response.message = "Retrived playlist " + playlist_id
        response.data = data

    return response


def get_artists(playlist: DubstepResponse) -> DubstepResponse:
    artists_map = {}

    response = DubstepResponse()

    if playlist.status == StatusResponse.Failure:
        response.status = playlist.status
        response.message = playlist.message

        return response
    items = playlist.data["items"]
    for item in items:
        track = item["track"]

        artists = track["artists"]
        for artist in artists:
            if artists_map.get(artist["id"], "") == "":
                artists_map[artist["id"]] = 1
            else:
                artists_map[artist["id"]] += 1

    response.status = StatusResponse.Success
    response.message = "Created artist map"
    response.data = artists_map
    return response


def get_most_popular_artists(playlist: DubstepResponse) -> DubstepResponse:
    response = DubstepResponse()

    if playlist.status == StatusResponse.Failure:
        response.status = playlist.status
        response.message = playlist.message
        response.data = playlist.data
        return response

    popular_artists = dict(
        sorted(playlist.data.items(), key=operator.itemgetter(1), reverse=True)[:5]
    )

    response.status, response.message, response.data = (
        StatusResponse.Success,
        "Found most popular artists",
        popular_artists,
    )

    return response


def get_spotify_recommendations(session, popular_artists: DubstepResponse) -> DubstepResponse:
    url = "https://api.spotify.com/v1/recommendations"
    artist_map = popular_artists.data
    artists = ",".join(artist_map.keys())

    params = {"limit": 50, "seed_artists": artists}

    recommendations = spotify_get_request(session, url, params)

    response = DubstepResponse()
    if recommendations == None:
        response.status, response.message = (
            StatusResponse.Failure,
            "Could not find recommendations",
        )
        return response

    response.status, response.message, response.data = (
        StatusResponse.Success,
        "Retrieved recommendations",
        recommendations,
    )

    return response

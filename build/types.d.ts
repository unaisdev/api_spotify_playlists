export interface AppUser {
    country: string;
    display_name: string;
    email: string;
    followers: Followers;
    href: string;
    id: string;
    images: [
        {
            url: string;
            height: number;
            width: number;
        }
    ];
    product: string;
    type: string;
    uri: string;
}
export interface AddPlaylist {
    id: string;
    playlistId: string;
    userId: string;
    trackIds: string[];
    last_update: Date;
}
export interface UpdatePlaylist {
    playlistId: string;
    userId: string;
    trackIds: string[];
    last_update: Date;
}
interface Followers {
    href: string;
    total: number;
}
export interface PlaylistItem {
    added_at: string;
    added_by: {
        external_urls: {
            spotify: string;
        };
        followers: {
            href: string;
            total: number;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    is_local: boolean;
    track: Track;
}
interface Track {
    album: {
        album_type: string;
        total_tracks: number;
        available_markets: string[];
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        images: {
            url: string;
            height: number;
            width: number;
        }[];
        name: string;
        release_date: string;
        release_date_precision: string;
        restrictions: {
            reason: string;
        };
        type: string;
        uri: string;
        copyrights: {
            text: string;
            type: string;
        }[];
        external_ids: {
            isrc: string;
            ean: string;
            upc: string;
        };
        genres: string[];
        label: string;
        popularity: number;
        album_group: string;
        artists: {
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
        }[];
    };
    artists: {
        external_urls: {
            spotify: string;
        };
        followers: {
            href: string;
            total: number;
        };
        genres: string[];
        href: string;
        id: string;
        images: {
            url: string;
            height: number;
            width: number;
        }[];
        name: string;
        popularity: number;
        type: string;
        uri: string;
    }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
        ean: string;
        upc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: any;
    restrictions: {
        reason: string;
    };
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}
export {};

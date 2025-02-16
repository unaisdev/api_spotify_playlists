import { CustomError } from "../types/playlist";
export declare class PlaylistValidationService {
    static validatePlaylistAddition(userId: string, tracks: any[]): Promise<void | CustomError>;
}

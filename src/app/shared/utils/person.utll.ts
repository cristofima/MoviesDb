import { MinimalMedia } from "src/app/core/models/base-media.model";

export class PersonUtil {

    public static getKnownForMedia(data: any): MinimalMedia[] {
        return ([...data.combined_credits.cast] as any[])
            .sort((a: any, b: any) => b.popularity - a.popularity)
            .slice(0, 8)
            .map((c: any) => {
                return {
                    id: c.id,
                    title: c.title || c.name,
                    posterPath: c.poster_path,
                    mediaType: c.media_type
                };
            });
    }
}
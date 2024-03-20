import { IMAGE_CONFIG, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

export class TmdbImgConfig {

    public static getImgProviders(){
        return [
            {
                provide: IMAGE_LOADER,
                useValue: (config: ImageLoaderConfig) => {
                    return `https://image.tmdb.org/t/p/w${config.width}${config.src}`;
                }
            },
            {
                provide: IMAGE_CONFIG,
                useValue: {
                    placeholderResolution: 92
                }
            }
        ];
    }
}
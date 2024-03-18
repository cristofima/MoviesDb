import { MinimalMedia } from '@/core/models/base-media.model';
import { PersonCredit } from '@/core/models/person.model';

export class PersonUtil {

    public static getKnownForMedia(data: any): MinimalMedia[] {
        let tempMediaList = ([...data.combined_credits.cast] as any[])
            .filter((c: any) => c.character !== 'Self')
            .sort((a: any, b: any) => {
                const getScore = (c: any, voteAvgPer = 0.7, popularityPer = 0.3) => {
                    let episodeCount = c.episode_count || 1;
                    let weightedScore = c.vote_average * c.vote_count * episodeCount;
                    
                    return weightedScore * voteAvgPer + c.popularity * popularityPer;
                }

                let scoreA = 0;
                let scoreB = 0;

                if(a.vote_count > b.vote_count && a.popularity < b.popularity) {
                    scoreA = getScore(a);
                    scoreB = getScore(b, 0.3, 0.7);
                }else{
                    scoreA = getScore(a, 0.3, 0.7);
                    scoreB = getScore(b);
                }

                return scoreB - scoreA;
            })
            .slice(0, 20)
            .map((c: any) => {
                return {
                    id: c.id,
                    title: c.title || c.name,
                    posterPath: c.poster_path,
                    mediaType: c.media_type
                };
            });
        
        let selectedItems: MinimalMedia[] = [];
        let mediaIds: string[] = [];
        const maxResults = 8;

        for (let i = 0; i < tempMediaList.length; i++) {
            if (selectedItems.length === maxResults) {
                break;
            }

            let mediaId = tempMediaList[i].mediaType + "-" + tempMediaList[i].id;
            if (!mediaIds.includes(mediaId)) {
                selectedItems.push(tempMediaList[i]);
                mediaIds.push(mediaId);
            }
        }

        return selectedItems;
    }

    public static getCreditsList(data: any) {
        let reducedCastCredits = (data.combined_credits.cast as any[])
            .filter((c: any) => c.release_date || c.first_air_date)
            .reduce((acc: any, c: any) => {
                const year = new Date(c.release_date || c.first_air_date).getFullYear();
                if (!acc[year]) {
                    acc[year] = [];
                }

                let credit = {
                    id: c.id,
                    title: c.title || c.name,
                    releaseDate: new Date(c.release_date || c.first_air_date),
                    mediaType: c.media_type,
                    character: c.character,
                    episodeCount: c.episode_count,
                    job: c.job
                };

                acc[year].push(credit);
                return acc;
            }, {});

        let creditsList = Object.keys(reducedCastCredits).sort((a, b) => parseInt(b) - parseInt(a))
            .map(year => {
                let personCredit: PersonCredit = {
                    year: +year,
                    credits: []
                };

                reducedCastCredits[year].sort((a: any, b: any) => b.releaseDate - a.releaseDate);

                let reducedCreditsByName = (reducedCastCredits[year] as any[]).reduce((acc: any, c: any) => {
                    const name = c.title;
                    if (!acc[name]) {
                        let credit = {
                            id: c.id,
                            title: name,
                            releaseDate: c.releaseDate,
                            mediaType: c.mediaType,
                            character: c.character,
                            jobs: []
                        };

                        if (c.episodeCount) {
                            credit.jobs.push({
                                episodeCount: c.episodeCount,
                                job: c.character
                            });
                        }

                        acc[name] = credit;
                    } else {
                        if (c.episodeCount) {
                            acc[name].jobs.push({
                                episodeCount: c.episodeCount,
                                job: c.character
                            });
                        }
                    }

                    return acc;
                }, {});

                personCredit.credits = Object.keys(reducedCreditsByName)
                    .map(name => {
                        return {
                            id: reducedCreditsByName[name].id,
                            title: name,
                            releaseDate: reducedCreditsByName[name].releaseDate,
                            mediaType: reducedCreditsByName[name].mediaType,
                            character: reducedCreditsByName[name].character,
                            jobs: reducedCreditsByName[name].jobs
                        };
                    });

                return personCredit;
            });

        return creditsList;
    }	
}
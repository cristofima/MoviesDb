import { MinimalMedia } from "src/app/core/models/base-media.model";
import { PersonCredit } from "src/app/core/models/person.model";

export class PersonUtil {

    public static getKnownForMedia(data: any): MinimalMedia[] {
        return ([...data.combined_credits.cast] as any[])
            .filter((c: any) => c.character !== 'Self' && !c.character.includes('(voice)'))
            .sort((a: any, b: any) => {
                let episodeCountA = a.episode_count || 1;
                let episodeCountB = b.episode_count || 1;

                if (b.vote_average !== a.vote_average) {
                    const weightedScoreA = a.vote_average * a.vote_count * episodeCountA;
                    const weightedScoreB = b.vote_average * b.vote_count * episodeCountB;

                    return weightedScoreB - weightedScoreA;
                }

                if (b.popularity !== a.popularity) {
                    return b.popularity * episodeCountB - a.popularity * episodeCountA;
                }

                return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
            })
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
export class LanguageUtil {
    
    public static getLanguage(code: string) {
        const lang = new Intl.DisplayNames(['en'], {type: 'language'});
        return lang.of(code);
    }
}
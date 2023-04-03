import {
    ComponentProps,
    ComponentType,
    FC,
    ReactElement,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

export type Messages = { [key in string | 'en']: Record<string, string> };

type TranslationProviderProps<M extends Messages> = {
    children: ReactNode;
    messages: M;
};

type TranslationsContextType = {
    messages: Messages;
    t: <K extends keyof Messages['en']>(key: K) => string;
    setLanguage: (lang: string) => void;
};

const TranslationsContext = createContext<TranslationsContextType>({} as TranslationsContextType);

export const TranslationsProvider = <M extends Messages>({
    children,
    messages,
}: TranslationProviderProps<M>): ReactElement => {
    const [language, setLanguage] = useState<string>((document.documentElement.lang.substring(0, 2) as string) || 'en');

    const t = (key: keyof Messages['en']) => messages[language][key];

    useEffect(() => {
        const handleLangChange = () => {
            console.log('change, lang: ', document.documentElement.lang);

            setLanguage(document.documentElement.lang.substring(0, 2) || 'en');
        };

        document.addEventListener('langchange', handleLangChange);

        return () => {
            document.removeEventListener('langchange', handleLangChange);
        };
    }, []);

    return <TranslationsContext.Provider value={{ messages, t, setLanguage }}>{children}</TranslationsContext.Provider>;
};

export const useTranslations = () => useContext(TranslationsContext);

export const withTranslations =
    (messages: ComponentProps<typeof TranslationsProvider>['messages']) =>
    <P extends object>(Component: ComponentType<P>): FC<P> => {
        return (props) => {
            return (
                <TranslationsProvider messages={messages}>
                    <Component {...(props as P)} />
                </TranslationsProvider>
            );
        };
    };

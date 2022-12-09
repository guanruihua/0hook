interface iMenuTemp {
    key: string;
    id: string;
    path: string;
    title?: string;
    icon?: string;
    menuShow?: boolean;
    canNoLogin?: boolean;
    [key: string]: any;
}
export interface iMenu extends iMenuTemp {
    iconCom?: any;
    children?: iMenu[];
}
export interface iRouter extends iMenuTemp {
    loadRoute?: boolean;
    module?: any;
    exact?: boolean;
    children?: iRouter[];
}
export declare type tLang = 'zh_CN' | 'en_US' | 'zh_TW';
export interface iLang {
    name: string;
    lang: tLang;
}
export {};
//# sourceMappingURL=index.d.ts.map
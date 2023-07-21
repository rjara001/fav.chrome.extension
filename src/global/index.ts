export let _shadowRoot : any;
export let _balloon : HTMLElement;
export let _matchInput = false;
export let _ITEMS:any[] = [];


export const getItems = ():any[] => {
    return _ITEMS;
}

export const setItems = (value:any[]) => {
    _ITEMS = value;
}

export const getShadowRoot = () =>{
    return _shadowRoot;
}

export const setShadowRoot = (value:any) => {
    _shadowRoot = value;
}

export const getBalloon = () =>{
    return _balloon;
}

export const setBalloon = (value:any) => {
    _balloon = value;
}

export const getMatchInput = () =>{
    return _matchInput;
}

export const setMatchInput = (value:any) => {
    _matchInput = value;
}


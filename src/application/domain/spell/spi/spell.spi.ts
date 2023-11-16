export interface SpellAxiosPort {
    checkSpell(content: string): Promise<string>;
}

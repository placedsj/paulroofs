export type ColorOption = {
    name: string;
    color: string;
    code: string;
};

export const metalColors: ColorOption[] = [
    { name: 'Charcoal', color: '#3A3B3D', code: 'DE-01' },
    { name: 'Graphite Grey', color: '#4B4E53', code: 'DE-02' },
    { name: 'Black', color: '#2F2F2F', code: 'DE-03' },
    { name: 'Stone Grey', color: '#8D8C8A', code: 'DE-04' },
    { name: 'Heron Blue', color: '#4E6078', code: 'DE-05' },
    { name: 'Majestic Royal', color: '#344964', code: 'DE-06' },
    { name: 'Coffee Brown', color: '#4B3F38', code: 'DE-07' },
    { name: 'Forest Green', color: '#3F4B3B', code: 'DE-08' },
    { name: 'Cherry Red', color: '#8B2C21', code: 'DE-09' },
    { name: 'Burgundy', color: '#5D2C2A', code: 'DE-10' },
];

export const shingleColors: ColorOption[] = [
    { name: 'Dual Black', color: '#3C3C3C', code: 'IKO-01' },
    { name: 'Charcoal Grey', color: '#5A5E64', code: 'IKO-02' },
    { name: 'Driftwood', color: '#7E7364', code: 'IKO-03' },
    { name: 'Weatherwood', color: '#625749', code: 'IKO-04' },
    { name: 'Dual Brown', color: '#6A4A3C', code: 'IKO-05' },
    { name: 'Harvard Slate', color: '#576673', code: 'IKO-06' },
    { name: 'Appalachian', color: '#70645A', code: 'IKO-07' },
    { name: 'Frostone Grey', color: '#A0A0A0', code: 'IKO-08' },
];

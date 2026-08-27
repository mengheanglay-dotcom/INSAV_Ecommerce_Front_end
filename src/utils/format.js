export const money = value => `$${Number(value || 0).toFixed(2)}`
export const categoryLabel = value => value?.replaceAll("men's", 'Men’s').replaceAll("women's", 'Women’s').replace('jewelery','Jewelry').replace('clothing','Clothing').replace('electronics','Electronics') || 'Shop'

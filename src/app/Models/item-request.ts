export class ItemUser{
    idUser:number=0
    emailUser:string=''
    usernameUser:string=''
}

export class ItemCategory{
    idCategory:number=0
    nameCategory:string=''
    parent_idCategory:number=0
}

export class Item{
    idItem:number=0
    titleItem:string=''
    descriptionItem:string =''
    conditionItem:number=0
    statusItem:number=0
    categoryId:number=0
    user?:ItemUser
    category?:ItemCategory
}

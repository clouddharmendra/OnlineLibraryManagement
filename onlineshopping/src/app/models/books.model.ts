export class Book {
    constructor(
        public id?: number,
        public title?: string,
        public image?: string,
        public price?: number,
        public available?: boolean,
        public language?: string,
        public yearOfPublication?: number,
        public genre?: string,
        public author?: string,
        public description?: string,
        public isbn?: number,
        public btnText?: string,
        public emailId?: string,
        public borrowedDate?: Date,
        public publisher?: string,
    ) { }
}
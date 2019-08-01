export class Message {
    constructor(
        private _id: string,
        private _creator: string,
        private _title: string,
        private _name: string,
        private _description: string,
        private _creationDate: Date,
    ) { }

    get id() {
        if (!this._id) {
            return null;
        }
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get creator() {
        if (!this._creator) {
            return null;
        }
        return this._creator;
    }

    get title() {
        if (!this._title) {
            return null;
        }
        return this._title;
    }

    get name() {
        if (!this._name) {
            return null;
        }
        return this._name;
    }

    get description() {
        if (!this._description) {
            return null;
        }
        return this._description;
    }

    get creationDate() {
        return this._creationDate;
    }

}

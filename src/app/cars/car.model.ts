export class Car {
    constructor(
        private _id: string,
        private _creator: string,
        private _title: string,
        private _name: string,
        private _location: string,
        private _description: string,
        private _startdate: Date,
        private _enddate: Date,
        private _price: string,
        private _creationDate: Date,
        private _finished: boolean
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

    get location() {
        if (!this._location) {
            return null;
        }
        return this._location;
    }

    get description() {
        if (!this._description) {
            return null;
        }
        return this._description;
    }

    get startdate() {
        if (!this._startdate) {
            return null;
        }
        return this._startdate;
    }

    get enddate() {
        if (!this._enddate) {
            return null;
        }
        return this._enddate;
    }

    get price() {
        if (!this._price) {
            return null;
        }
        return this._price;
    }

    get creationDate() {
        return this._creationDate;
    }

    get finished() {
        return this._finished;
    }

}

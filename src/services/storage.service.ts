import { STORAGE_KEYS } from './../config/storage-keys.config';
import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local-user";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        const usr = localStorage.getItem(STORAGE_KEYS.localUser);

        return usr == null ? null : JSON.parse(usr);
    }

    setlocalUser(obj: LocalUser) {
        localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }

    deleteLocalUser() {
        localStorage.removeItem(STORAGE_KEYS.localUser);
    }

    localUserIsDefined() : Boolean {
        return this.getLocalUser() == null ? false : true;
    }
}
import {configureStore} from "@reduxjs/toolkit"
import User from "./User";

const Store= configureStore({
    name:"Token",
    reducer:{
        User:User
    }
})

export default Store;
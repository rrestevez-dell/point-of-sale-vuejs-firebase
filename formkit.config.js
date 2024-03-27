import { generateClasses } from "@formkit/themes"

const config = {
    config: {
        classes: generateClasses({
            global: {
                label: " block mb-1 font-blod uppercase text-lg",
                message: " text-red-500 mb-5",
                wrapper: "space-y-2 mb-3",
                input: "w-full p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400"
            },
            file: {
                message: "text-red-500 mb-5", // con esto le quito todas las clases y me permite agregarle otras solo a este
                noFiles: "block my-2",
                fileItem: "hidden",
            },
            submit: {
                input: "$reset bg-green-400 hover:bg-green-500 w-full p-2 font-bold uppercase disable:opacity-50"
            }
        })
    }
}

export default config

/*
Creando este objeto JSON es una variante para poder repetir menos codigo pero en este caso lo 
lealizamos con lo que nos brinda forkit que es una forma global

import tailwindcssClass from './tailwindcss-class.json'
text: {
    message: tailwindcssClass.message,
    label: tailwindcssClass.label
},

*/
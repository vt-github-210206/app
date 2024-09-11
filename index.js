const { select, input } = require('@inquirer/prompts')

let meta = {
    value: 'tomar 3L de agua por dia',
    checked: false,
}

let metas = [ meta]
    
const  cadrastarMeta = async () => {
    const meta = await input ({ mensage: "Digite a meta:"})

    if(meta.length == 0) {
        console.log('a meta nao pode ser vazia.')
        return
    }

    metas.push(
        { value: meta, checked: false }
    )
}

const start =async () => {
    
    while(true){

        const opcao = await select ({
            mensage: "menu >",
            choices: [
                {
                    name: "cadastrar meta",
                    value: "cadastrar"
                 },
                 {
                    name: "listar metas",
                    value: "listar"
                 },
                 {
                    name: "Sair",
                    value: "sair"
                 }
            ]
        })


        switch(opcao) {
            case "cadastrar":
                 await cadrastarMeta()
                 console.log(metas)
                 break
            case "listar":
                 console.log("vamos listar")
                 break
                 case "sair":
                    console.log("ate a proxima!")
                    return
         }
    }
}

start()
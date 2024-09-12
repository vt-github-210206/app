const { select, input, checkbox } = require('@inquirer/prompts')

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

const listarMetas = async () => {
    const respostas = await checkbox({
        mensage: "use as setas para mudar de meta, o espaco para madar ou desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    }) 

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada!")
        return
    }
    
    
    
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
 
        meta.checked = true
    })

    console.log('Meta(s) marcadas como consluida(s)')

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0 ) {
        console.log('nao existem metas realiazadas! :(')
        return
    }

    await select({
        message: "metas realizadas" + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        console.log("nao existem metas abertas! :)")
        return
    }

    await select({
        message: "metas abertas" + abertas.length,
        choices: [...abertas]
    })
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
                    name: "Metas realizadas",
                    value: "Realizadas"
                 },
                 {
                    name: "Metas abertas",
                    value: "abertas"
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
                 await listarMetas()
                 break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break         
            case "sair":
                    console.log("ate a proxima!")
                    return
         }
    }
}

start()
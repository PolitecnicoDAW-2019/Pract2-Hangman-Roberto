const hangedView = new Promise((resolve, reject) => {
    resolve(new HangedView());
})


const app = new HangedController(new HangedView());
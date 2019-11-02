const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
  //const todos = await Todo.find({})
  res.render('index', {
    title: 'Convert page',
    //isIndex: true,
    //todos
  })
})

module.exports = router

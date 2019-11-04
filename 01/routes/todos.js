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

// router.get('/api', (req, res) => {
//   request(
//     { url: 'https://currate.ru/api/?get=rates&pairs=USDRUB,EURRUB&key=763cfb0fa49f7c16319810bbf106680d' },
//     (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: err.message });
//       }
//
//       res.json(JSON.parse(body));
//     }
//   )
// });

module.exports = router

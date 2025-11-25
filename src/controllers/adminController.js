
// Dashboard do ADMIN
const dashboard = (req, res) => {
  const success = req.session.success;
  req.session.success = null;
  res.render('admin/dashboard', { 
    success,
    user: req.session.user 
  })
}


module.exports =  { dashboard }
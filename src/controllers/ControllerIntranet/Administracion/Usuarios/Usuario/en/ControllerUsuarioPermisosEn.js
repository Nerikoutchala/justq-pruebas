const layout = '../../views/pages/intranet/administracion/usuarios/usuario/';
const modules = 'modules/intranet/administracion/usuarios/usuario/';

const {requested} = require(appRoot+'/utils/Admin/UtilRequested');
const {isPermissedTo} = require(appRoot+'/utils/Permissions');
const {getUserData} = require(appRoot+'/utils/GetUser');

const {getUsuarioPermisos, postUsuarioPermisos, postUsuarioPermisosDelete} = require(appRoot+'/utils/Admin/Usuarios/Usuario/UtilPermisos');


const menuAdmin = true;
const nav = 'administracion-usuarios';

module.exports = {

    async getPermisosUsuarioEn(req, res){

        const cnf = requested(req);

        if(await isPermissedTo(cnf.user_id, cnf.rol, 'ADMIN-USUARIOS')){

            const data = await getUsuarioPermisos(cnf.id);
            const user = getUserData(req);            

            res.render(modules+'en/permisos', {layout: layout+'en/permisos.hbs', csrfToken: req.csrfToken(), data, menuAdmin, pagina: cnf.pagina, user, nav});
        }else{
            res.redirect('/ERROR/unauthorized');
        }
        
    },

    async postPermisosUsuarioEn(req, res){

        const cnf = requested(req);

        if(await isPermissedTo(cnf.user_id, cnf.rol, 'ADMIN-USUARIOS')){
            let response = await postUsuarioPermisos(cnf);
            res.json(response);
        }else{
            res.redirect('/ERROR/unauthorized');
        }

        
    },

    async postDeletePermisosUsuarioEn(req, res){
        const cnf = requested(req);
        if(await isPermissedTo(cnf.user_id, cnf.rol, 'ADMIN-USUARIOS')){
            let response = await postUsuarioPermisosDelete(cnf);
            res.json(response);
        }else{
            res.redirect('/ERROR/unauthorized');
        }

    },

};
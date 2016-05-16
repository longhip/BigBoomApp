(function() {
    'use strict';
    
    require('./core/app');
    require('./core/directives');
    require('./core/routes');
    require('./configs/app');
    require('./core/factories/Core');
    require('./modules/auth/auth.component');
    require('./modules/user/user.component');
    require('./modules/dashboard/dashboard.component');
    require('./modules/store/store.component');
    require('./modules/store/photo/photo.component');
    require('./modules/store/photo/album/album.component');
    require('./modules/store/menu/menu.component');
    require('./modules/store/menu/food/food.component');
    require('./modules/store/article/article.component');

}());

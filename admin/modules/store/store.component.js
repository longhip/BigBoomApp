(function() {
    'use strict';

    angular
        .module('BigBoomApp.Store')
        .controller('StoreController', StoreController);

    function StoreController(Core, StoreFactory) {
        var vm = this;

        function __construct() {
            vm.store = {};
            vm.cities = StoreFactory.cities();
            vm.regions = StoreFactory.regions();
            vm.times = StoreFactory.times();
            vm.optionsEditor = StoreFactory.optionsEditor();
            vm.moduleApiUrl = Core.$rootScope.serverApiUrl + 'store';
        }
        __construct();

        vm.index = function() {
            Core.apiRequest('GET', vm.moduleApiUrl, '', '').success(function(response) {
                if (response.status) {
                    vm.store = response.data.store;
                }
            });
        };

        vm.update = function(form) {
            Core.validateHandle(form).success(function() {
                Core.apiRequest('PUT', vm.moduleApiUrl, vm.store, '').success(function(response) {
                    if (response.status) {
                        vm.store = response.data.store;
                        Core.toastyPopSuccess(response.message);
                    }
                });
            }).error(function() {
                Core.toastyPopErrors('MESSAGE.FORM_INVALID');
            });
        };

        vm.changeCoverImage = function(file) {
            if (file) {
                file.upload = Core.Upload.upload({
                    url: vm.moduleApiUrl + '/cover-image',
                    data: { cover_image: file },
                    headers: { 'x-access-token': Core.$cookieStore.get('token') }
                });

                file.upload.then(function(response) {
                    Core.$timeout(function() {
                        vm.store = response.data.data.store;
                        Core.toastyPopSuccess(response.data.message);
                    });
                }, function(response) {
                    if (response.status > 0) {
                        Toasty.popErrors('MESSAGE.SOMETHING_WENT_WRONG');
                    }
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };

        vm.changeLogo = function(dataUrl, name) {
            Core.Upload.upload({
                url: vm.moduleApiUrl + '/logo',
                data: {
                    logo: Core.Upload.dataUrltoBlob(dataUrl, name)
                },
                headers: { 'x-access-token': Core.$cookieStore.get('token') }
            }).then(function(response) {
                Core.$timeout(function() {
                    vm.store = response.data.data.store;
                    Core.toastyPopSuccess(response.data.message);
                });
            }, function(response) {
                Toasty.popErrors('MESSAGE.SOMETHING_WENT_WRONG');
            }, function(evt) {
                vm.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        };
    }

})();


(function() {
    'use strict';

    angular
        .module('BigBoomApp.Store')
        .factory('StoreFactory', StoreFactory);

    function StoreFactory() {
        return {
            optionsEditor: function() {
                return {
                    height: 200,
                    focus: true,
                    toolbar: [
                        ['edit', ['undo', 'redo']],
                        ['headline', ['style']],
                        ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                        ['textsize', ['fontsize']],
                        ['fontclr', ['color']],
                        ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                        ['height', ['height']],
                        ['insert', ['link', 'picture', 'hr']]
                    ]
                };
            },
            times: function() {
                return [
                    { name: '00:00' },
                    { name: '00:30' },
                    { name: '01:00' },
                    { name: '01:30' },
                    { name: '02:00' },
                    { name: '02:30' },
                    { name: '03:00' },
                    { name: '03:30' },
                    { name: '04:00' },
                    { name: '04:30' },
                    { name: '05:00' },
                    { name: '05:30' },
                    { name: '06:00' },
                    { name: '06:30' },
                    { name: '07:00' },
                    { name: '07:30' },
                    { name: '08:00' },
                    { name: '08:30' },
                    { name: '09:00' },
                    { name: '09:30' },
                    { name: '10:00' },
                    { name: '10:30' },
                    { name: '11:00' },
                    { name: '11:30' },
                    { name: '12:00' },
                    { name: '12:30' },
                    { name: '13:00' },
                    { name: '13:30' },
                    { name: '14:00' },
                    { name: '14:30' },
                    { name: '15:00' },
                    { name: '15:30' },
                    { name: '16:00' },
                    { name: '16:30' },
                    { name: '17:00' },
                    { name: '17:30' },
                    { name: '18:00' },
                    { name: '18:30' },
                    { name: '19:00' },
                    { name: '19:30' },
                    { name: '20:00' },
                    { name: '20:30' },
                    { name: '21:00' },
                    { name: '21:30' },
                    { name: '22:00' },
                    { name: '22:30' },
                    { name: '23:00' },
                    { name: '23:30' }
                ];
            },
            regions: function() {
                return [
                    { id: 1, name: 'Miền Bắc' },
                    { id: 2, name: 'Miền Trung' },
                    { id: 3, name: 'Miền Nam' }
                ];
            },
            cities: function() {
                return [
                    { name: 'Hà Nội', region: 1 },
                    { name: 'TP HCM', region: 3 },
                    { name: 'Cần Thơ', region: 3 },
                    { name: 'Đà Nẵng', region: 2 },
                    { name: 'Hải Phòng', region: 1 },
                    { name: 'An Giang', region: 3 },
                    { name: 'Bà Rịa - Vũng Tàu', region: 3 },
                    { name: 'Bắc Giang', region: 1 },
                    { name: 'Bắc Kạn', region: 3 },
                    { name: 'Bạc Liêu', region: 3 },
                    { name: 'Bắc Ninh', region: 1 },
                    { name: 'Bến Tre', region: 3 },
                    { name: 'Bình Định', region: 2 },
                    { name: 'Bình Dương', region: 3 },
                    { name: 'Bình Phước', region: 3 },
                    { name: 'Bình Thuận', region: 3 },
                    { name: 'Cà Mau', region: 3 },
                    { name: 'Cao Bằng', region: 1 },
                    { name: 'Đắk Lắk', region: 2 },
                    { name: 'Đắk Nông', region: 2 },
                    { name: 'Điện Biên', region: 1 },
                    { name: 'Đồng Nai', region: 3 },
                    { name: 'Đồng Tháp', region: 3 },
                    { name: 'Gia Lai', region: 2 },
                    { name: 'Hà Giang', region: 1 },
                    { name: 'Hà Nam', region: 1 },
                    { name: 'Hà Tĩnh', region: 1 },
                    { name: 'Hải Dương', region: 1 },
                    { name: 'Hậu Giang', region: 1 },
                    { name: 'Hòa Bình', region: 1 },
                    { name: 'Hưng Yên', region: 1 },
                    { name: 'Khánh Hòa', region: 1 },
                    { name: 'Kiên Giang', region: 1 },
                    { name: 'Kon Tum', region: 1 },
                    { name: 'Lai Châu', region: 1 },
                    { name: 'Lâm Đồng', region: 1 },
                    { name: 'Lạng Sơn', region: 1 },
                    { name: 'Lào Cai', region: 1 },
                    { name: 'Long An', region: 1 },
                    { name: 'Nam Định', region: 1 },
                    { name: 'Nghệ An', region: 1 },
                    { name: 'Ninh Bình', region: 1 },
                    { name: 'Ninh Thuận', region: 1 },
                    { name: 'Phú Thọ', region: 1 },
                    { name: 'Quảng Bình', region: 1 },
                    { name: 'Quảng Nam', region: 1 },
                    { name: 'Quảng Ngãi', region: 1 },
                    { name: 'Quảng Ninh', region: 1 },
                    { name: 'Quảng Trị', region: 1 },
                    { name: 'Sóc Trăng', region: 1 },
                    { name: 'Sơn La', region: 1 },
                    { name: 'Tây Ninh', region: 1 },
                    { name: 'Thái Bình', region: 1 },
                    { name: 'Thái Nguyên', region: 1 },
                    { name: 'Thanh Hóa', region: 1 },
                    { name: 'Thừa Thiên Huế', region: 1 },
                    { name: 'Tiền Giang', region: 1 },
                    { name: 'Trà Vinh', region: 1 },
                    { name: 'Tuyên Quang', region: 1 },
                    { name: 'Vĩnh Long', region: 1 },
                    { name: 'Vĩnh Phúc', region: 1 },
                    { name: 'Yên Bái', region: 1 },
                    { name: 'Phú Yên', region: 1 }
                ];
            }
        };
    }
})();

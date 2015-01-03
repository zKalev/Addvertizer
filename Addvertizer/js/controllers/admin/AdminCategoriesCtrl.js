addApp.controller('AdminCategoriesCtrl', ['$scope', '$location', '$routeParams', 'CategoriesResource', 'CategoryService', 'NotificationService',
    function ($scope, $location, $routeParams, CategoriesResource, CategoryService, NotificationService) {
        CategoriesResource.all().then(
            function (data) {
                $scope.categories = data;
                console.log(data);
            },
            function (error) {
                console.log(error);
            });

        $scope.navigateToEditCategory = function (category) {

            $location.path('/admin/categories/edit/' + JSON.stringify(category));
        }
        $scope.navigateToDeleteCategory = function (category) {
            $location.path('/admin/categories/delete/' + JSON.stringify(category));
        }

        if ($routeParams.editId !== undefined) {
            $scope.currentCategory = JSON.parse($routeParams.editId);
        }
        if ($routeParams.deleteId !== undefined) {
            $scope.currentCategory = JSON.parse($routeParams.deleteId);
        }

        $scope.editCategory = function (category) {
            CategoryService.updateCategory(category).then(
                function (data) {
                    console.log(data);
                    NotificationService.success(data.message);
                    $location.path('/admin/categories');
                },
                function (error) {
                    console.log(error)
                });
        }
        $scope.deleteCategory = function (category) {

            CategoryService.deleteCategory(category.id).then(
                function (data) {
                    console.log(data);
                    NotificationService.success(data.message);
                    $location.path('/admin/categories');
                },
                function (error) {
                    console.log(error)
                });
        }

        $scope.createCategory=function(category){
            CategoryService.createCategory(category).then(
                function (data) {
                    console.log(data);
                    NotificationService.success(data.message);
                    $location.path('/admin/categories');
                },
                function (error) {
                    console.log(error)
                });
        }
    }]);

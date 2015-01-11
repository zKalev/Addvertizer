addApp.directive('uploadImageWithPreview', ['$window', function ($window) {

    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
        },
        templateUrl: './views/directives/uploadImage.html',
        link: function (scope, elem, attr, ngModel) {
            var $inputFile = elem.find('.input-file'),
                $inputText = elem.find('.input-text'),
                $deleteImg=elem.find('.delete-img');

            $inputFile.on('change', function (ev) {
                var file = ev.target.files[0],
                    localFilePath = $inputFile.val(),
                    reader = new FileReader();
                reader.readAsArrayBuffer(file);
                $inputText.val(localFilePath);

                reader.onload = function () {
                    var buff = reader.result,
                        base64 = _arrayBufferToBase64(buff),
                        finalUrl = "data:" + file.type + ";base64," + base64;
                    console.log(finalUrl);

                    scope.$apply(function () {
                        ngModel.$setViewValue(finalUrl);
                    });
                }


            });
            $deleteImg.on('click',function(){
                ngModel.$setViewValue(undefined);
            })

            function _arrayBufferToBase64(buffer) {
                var binary = '';
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return $window.btoa(binary);
            }
        }
    }

}]);

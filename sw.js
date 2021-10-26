//Asignar nombre y versión a la cache
const CACHE_NAME = "v1_pwa_rmp";

//Archivos para la cache
var urlsToCache = [
    './',
    './css/style.css',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon.png',
    './img/favicon-16x16.png',
    './img/favicon-32x32.png',
    './img/favicon-96x96.png',
    './img/favicon-256x256.png'
];

/*--------------------------EVENTOS----------------------*/
//INSTALL: instalar el SW y guardar en cache los recursos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open( CACHE_NAME )
            .then( cache => {
                return cache.addAll( urlsToCache )
                    .then( ()=> {
                        console.log("Instalación completa");
                        self.skipWaiting();
                    })
            })
            .catch( error => {
                console.log("No se pudo registrar la cache", error );
            })
    );
});

//ACTIVATE: La APP pueda funconar sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then( cacheNames => {

                return Promise.all(
                    cacheNames.map( cacheName => {
                        
                        if( cacheWhitelist.indexOf(cacheName) === -1 )
                        {
                            console.log('Si funciona');
                            return caches.delete( cacheName );
                        }
                    })
                )

            })
            .then( () => {
                self.clients.claim(); //Activar en todos los clientes
            })
    )

});


//Evento Fetch
self.addEventListener( 'fetch', e => {

    e.respondWith(
        caches.match( e.request )
            .then( resp => {
                if( resp ){
                    return resp;
                }

                return fetch( e.request );
            })
    );
});
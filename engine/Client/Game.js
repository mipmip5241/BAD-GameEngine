class Game extends SceneTemplate
{
    initialize()
    {
        ObjectManager.camera = new Camera(vec2.fromValues(0, 0), 640, 480);
        let score = 0;
        let speed_counter = 0;
        let dino = new Player();
        let floor = new Floor();
        let obstacle = new Obstacle();
        ObjectManager.addObject(dino);
        ObjectManager.addObject(floor);
        ObjectManager.addObject(obstacle);

        EventManager.addEvent('dino-floor-collision', function ()
            {
                if (CollisionDetection.AABB_detection(dino, floor) && dino.rigitBody.getVelocity()[Y] < 0)
                {
                    dino.rigitBody.setVelocity(0,0);
                    dino.rigitBody.setAceleracion(0,0);
                }
               CollisionDetection.AABB_resolve(dino,floor);
            })

        EventManager.addEvent('jump-limit', function ()
        {
            if (dino.rigitBody.getVelocity()[Y] === 0 && !CollisionDetection.AABB_detection(dino,floor))
            {
                dino.rigitBody.setAceleracion(0,0);
                dino.rigitBody.setVelocity(0,-20);
            }
        })

        EventManager.addEvent('dino-obstacle-collision', function ()
        {
            if(CollisionDetection.SAT_detection(dino,obstacle))
            {
                GameLoop.stop();
            }
        })

        EventManager.addEvent('score', function ()
        {
            score++;
            if (speed_counter === 100)
            {
                speed_counter = 0;
            }
            speed_counter++;
        })

        EventManager.addEvent('change-speed', function ()
        {
            if (speed_counter === 100)
                obstacle.speed++;
        })
    }

    loadScene()
    {

    }

    unloadScene() {
        EventManager.clearEvents()
        ObjectManager.clearObjects()
        Engine.startScene(new GameOver());
    }
}
class GameOver extends SceneTemplate
{
    initialize()
    {
        //ADD game over text

        EventManager.addEvent('restart', function ()
        {
            if(Engine.input.isKeyClicked(Input.keys.R))
            {
                GameLoop.stop();
            }
        })

    }

    loadScene() {

    }

    unloadScene() {
        EventManager.clearEvents()
        ObjectManager.clearObjects()
        Engine.startScene(new Game());
    }
}
class ObjectManager
{

   static camera = null;

   static objects = [];

   static addObject(object) {ObjectManager.objects.push(object);}

   static runDraw()
   {
       gl.clearColor(1,1,1,1);
       gl.clear(gl.COLOR_BUFFER_BIT);
        for (var key in layers) 
        {

            for (let j = 0; j < ObjectManager.objects.length; j++)
            {

                if(ObjectManager.objects[j].layer == layers[key])
                    ObjectManager.objects[j].draw();
            }
        }
        
   }

   static clearObjects()
   {
       ObjectManager.objects.length = 0
   }
   static runUpdate()
   {
        for (let j = 0; j < ObjectManager.objects.length; j++)
        {
            ObjectManager.objects[j].update();
        }
   }

   static runPhysics()
   {
    for (let j = 0; j < ObjectManager.objects.length; j++)
    {   


        if (ObjectManager.objects[j].rigitBody != null)
        {
            ObjectManager.objects[j].rigitBody.updatePosByPhysics(ObjectManager.objects[j].getTransform());
        }
            
    }
   }

   static checkCollisions()
   {
        for (let j = 0; j < ObjectManager.objects.length; j++)
        {
            for (let i = 0; i < ObjectManager.objects.length; i++)
            {
                if (ObjectManager.objects[j] != ObjectManager.objects[i])
                {
                    if (ObjectManager.objects[j].collider != null && ObjectManager.objects[j].collider != null)
                    {
                        if (ObjectManager.objects[j].rigitBody != null && ObjectManager.objects[i].rigitBody != null)
                        {
                            CollisionDetection.checkCollisions(ObjectManager.objects[j], ObjectManager.objects[i]);
                        }
                    }
                }
                    
            }
            
        }
   }

}
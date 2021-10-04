class squareButtonCollider
{
    constructor(transform)
    {
        this.center = transform.getPosition();
        this.radius = transform.getScaleX()/2;
    }

    /**
     * Check if the button got clicked.
     * @param {number} button - the button to check.
     * @return {boolean} true if the button was clicked and false if not.
     */
    checkButtonClicked(button)
    {
        let x = Input.mousePosX;
        let y = Input.mousePosY;

        let distance = Math.sqrt((x - center[X])*(x - center[X]) - (y - center[Y])*(y - center[Y]));

        return (distance < this.radius) && Input.isButtonClicked[button];   
    }

     /**
     * Check if the button got preesed.
     * @param {number} button - the button to check.
     * @return {boolean} true if the button was preesed and false if not.
     */
    checkButtonPressed(button)
    {
        let x = Input.mousePosX;
        let y = Input.mousePosY;

        let distance = Math.sqrt((x - center[X])*(x - center[X]) - (y - center[Y])*(y - center[Y]));

        return (distance < this.radius) && Input.isButtonPressed[button];   
    }
}
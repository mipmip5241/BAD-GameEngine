class squareButtonCollider
{
    constructor(transform)
    {
        this.center = transform.getPosition();
        this.width = transform.getScaleX();
        this.height = transform.getScaleY();
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

        let top = this.center[Y] + this.height / 2;
        let bottom = this.center[Y] - this.height / 2;
        let left = this.center[X] - this.width / 2;
        let right = this.center[X] + this.width / 2;

        if (x < left || x > right || y > top || y < bottom)
            return false;

        if (!Input.isButtonClicked[button])
            return false;

        return true;
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

        let top = this.center.y + this.height / 2;
        let bottom = this.center.y - this.height / 2;
        let left = this.center.x - this.width / 2;
        let right = this.center.x + this.width / 2;

        

        if (x < left || x > right || y > top || y < bottom)
            return false;

        if (!Input.isButtonPressed[button])
            return false;

        return true;
    }
    

}
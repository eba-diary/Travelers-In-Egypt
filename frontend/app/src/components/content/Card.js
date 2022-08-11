function Card(props) {
    let imageHolder = 
        <div>
            <img src="" alt=""/>
        </div>
    ;

    let cardText = 
        <div>
            <p>
                Title
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic quod ullam culpa velit aliquid illum odit distinctio molestiae voluptas debitis?
            </p>
        </div>
    ;

    return(
        <div>
            {imageHolder}
            {cardText}
        </div>
    );
}


export default Card;
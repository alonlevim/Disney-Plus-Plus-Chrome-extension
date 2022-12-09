// 6:20
setTimeout(() => {
    const groups = document.getElementsByClassName("group");
    const dots = document.querySelectorAll(".dots .dot");
    let nextIndex = Object.values(groups).findIndex((group) => group.className.includes("active"));
    nextIndex = nextIndex > -1 ? nextIndex+1 : nextIndex;
    nextIndex = nextIndex > groups.length ? 0 : nextIndex;

    Object.values(groups).forEach((group, index) => {
        if( index !== nextIndex ) {
            group.className = group.className.replace("active", "");
            dots[index].className = dots[index].className.replace("active", "");
        } else {
            group.className = (group.className.replace("active", "") + " active").trim();
            dots[index].className = (dots[index].className.replace("active", "") + " active").trim();
        }
    });

}, 6333.33);
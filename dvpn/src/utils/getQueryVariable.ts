


// url --                        
export function getQueryVariable(variable: string): string | false {
    
    var query = window.location.toString()
    const parts = query.split('?');
    var vars = parts[1].split("&");

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");

        if (pair[0] == variable) {
            return pair[1];
        }
    }

    return false;
}
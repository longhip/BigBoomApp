import { Http, Headers} from '@angular/http';

export class Core {


    public serverUrl = 'http://localhost:1337';

    constructor(public http: Http){
        
    }

}
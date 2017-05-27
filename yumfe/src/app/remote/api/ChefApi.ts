/**
 * Yum Food Orders
 * **Yum application, order food daily from the best chef in town**  This API is used by the angular.io client, and is not meant to be used otherwise.  Find source code of this API [here](http://gitlab/)  Copyright (C) 2017 JR Technologies.     ------------------------------------       Last edit: 21/04/2017 15:00   -------------------------------------
 *
 * OpenAPI spec version: 1.0.7
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { Http, Headers, URLSearchParams }                    from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseContentType }                     from '@angular/http';

import { Observable }                                        from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as models                                           from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';

/* tslint:disable:no-unused-variable member-ordering */


@Injectable()
export class ChefApi {
    protected basePath = 'http://localhost:8082/api';
    public defaultHeaders: Headers = new Headers();
    public configuration: Configuration = new Configuration();

    constructor(protected http: Http, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
        }
    }

    /**
     * Put Food/Foods in a dailyMenu
     *
     * @param id
     * @param dailyMenu The daily menu to be updated
     */
    public dailyMenusIdPut(id: string, dailyMenu: models.DailyMenuEdit, extraHttpRequestParams?: any): Observable<Response> {
        return this.dailyMenusIdPutWithHttpInfo(id, dailyMenu, extraHttpRequestParams)
            .map((response: Response) => {
                return response;
                /*if (response.status === 204 || response.status === 200) {
                    return response.json();
                } else {
                    return response.json();
                }*/
            });
    }

    /**
     * Gets all dailyMenus
     * Return a list of all dailyMenus
     */
    public dailyMenusMonthlyGet(extraHttpRequestParams?: any): Observable<Array<models.DailyMenuChef>> {
        return this.dailyMenusMonthlyGetWithHttpInfo(extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Get dailyMenus by month
     *
     * @param monthyear ex. 02-2017
     */
    public dailyMenusMonthlyMonthyearGet(monthyear: string, extraHttpRequestParams?: any): Observable<Array<models.DailyMenuChef>> {
        return this.dailyMenusMonthlyMonthyearGetWithHttpInfo(monthyear, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * New daily menu
     *
     * @param newDailyMenu A new daily menu
     */

    public dailyMenusPost(newDailyMenu: models.NewDailyMenu, extraHttpRequestParams?: any): Observable<models.DailyMenuChef> {
        return this.dailyMenusPostWithHttpInfo(newDailyMenu, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }
    /**
     * Get food by name
     *
     * @param name
     */
    public foodsFindByNameNameGet(name: string, extraHttpRequestParams?: any): Observable<models.Food> {
        return this.foodsFindByNameNameGetWithHttpInfo(name, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Deletes an existing food
     * Chef can update food name, type, description or price
     * @param foodId
     * @param archive
     */
    public foodsFoodIdDelete(foodId: number, archive?: boolean, extraHttpRequestParams?: any): Observable<{}> {
        return this.foodsFoodIdDeleteWithHttpInfo(foodId, archive, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Get food by id, optionally check if editable
     *
     * @param foodId
     * @param editable
     */
    public foodsFoodIdGet(foodId: number, editable?: string, extraHttpRequestParams?: any): Observable<models.FoodEditable> {
        return this.foodsFoodIdGetWithHttpInfo(foodId, editable, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Updates an existing food
     * Chef can update food name, type, description or price
     * @param foodId
     * @param food The food to be updated
     * @param clone
     */
    public foodsFoodIdPut(foodId: number, food: models.EditedFood, clone?: boolean, extraHttpRequestParams?: any): Observable<models.Message> {
        return this.foodsFoodIdPutWithHttpInfo(foodId, food, clone, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Gets all foods, optionally return stats per food
     * Return a list of all foods
     * @param stats
     * @param page Request pagination page
     * @param size Request pagination size / num of foods
     * @param foodType Request foodType filter
     * @param archived Request archived filter
     * @param orderBy Request orderBy filter
     * @param foods_version Request foods_version
     * @param orderDirection Request order direction filter
     */
    public foodsGet(stats?: boolean, page?: string, size?: string, foodType?: string, archived?: string, orderBy?: string, foods_version?: number, orderDirection?: string,  extraHttpRequestParams?: any): Observable<models.FoodsPage> {
        return this.foodsGetWithHttpInfo(stats, page, size, foodType, archived, orderBy, foods_version, orderDirection, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                }
                else if(response.status === 304){
                    let foodsPage: models.FoodsPage;
                    foodsPage.foods_version = foods_version;
                    return foodsPage;
                }
                else {
                    return response.json();
                }
            });
    }

    /**
     * A new food
     * Create a food with basic data
     * @param foodDetails The food to save
     */
    public foodsPost(foodDetails?: models.FoodDetails, extraHttpRequestParams?: any): Observable<models.Message> {
        return this.foodsPostWithHttpInfo(foodDetails, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Get daily orders summary
     *
     * @param day
     */
    public ordersDailyDayGet(day: string, extraHttpRequestParams?: any): Observable<models.DailyOrderSummary> {
        return this.ordersDailyDayGetWithHttpInfo(day, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Get a summary of orders by month
     *
     */
    public ordersMonthlyGet(extraHttpRequestParams?: any): Observable<Array<models.DailyMenuOrder>> {
        return this.ordersMonthlyGetWithHttpInfo(extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Get a summary of orders by month
     *
     * @param monthyear ex 02-2017
     */
    public ordersMonthlyMonthyearGet(monthyear: string, extraHttpRequestParams?: any): Observable<Array<models.DailyMenuOrder>> {
        return this.ordersMonthlyMonthyearGetWithHttpInfo(monthyear, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }


    /**
     * Put Food/Foods in a dailyMenu
     *
     * @param id
     * @param dailyMenu The daily menu to be updated
     */
    public dailyMenusIdPutWithHttpInfo(id: string, dailyMenu: models.DailyMenuEdit, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/dailyMenus/${id}`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling dailyMenusIdPut.');
        }
        // verify required parameter 'dailyMenu' is not null or undefined
        if (dailyMenu === null || dailyMenu === undefined) {
            throw new Error('Required parameter dailyMenu was null or undefined when calling dailyMenusIdPut.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: dailyMenu == null ? '' : JSON.stringify(dailyMenu), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Gets all dailyMenus
     * Return a list of all dailyMenus
     */
    public dailyMenusMonthlyGetWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/dailyMenus/monthly`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Get dailyMenus by month
     *
     * @param monthyear ex. 02-2017
     */
    public dailyMenusMonthlyMonthyearGetWithHttpInfo(monthyear: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/dailyMenus/monthly/${monthyear}`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'monthyear' is not null or undefined
        if (monthyear === null || monthyear === undefined) {
            throw new Error('Required parameter monthyear was null or undefined when calling dailyMenusMonthlyMonthyearGet.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * New daily menu
     *
     * @param newDailyMenu A new daily menu
     */
    public dailyMenusPostWithHttpInfo(newDailyMenu: models.NewDailyMenu, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/dailyMenus`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'newDailyMenu' is not null or undefined
        if (newDailyMenu === null || newDailyMenu === undefined) {
            throw new Error('Required parameter newDailyMenu was null or undefined when calling dailyMenusPost.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: newDailyMenu == null ? '' : JSON.stringify(newDailyMenu), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Get food by name
     *
     * @param name
     */
    public foodsFindByNameNameGetWithHttpInfo(name: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/foods/findByName/${name}`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling foodsFindByNameNameGet.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Deletes an existing food
     * Chef can update food name, type, description or price
     * @param foodId
     * @param archive
     */
    public foodsFoodIdDeleteWithHttpInfo(foodId: number, archive?: boolean, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/foods/${foodId}`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'foodId' is not null or undefined
        if (foodId === null || foodId === undefined) {
            throw new Error('Required parameter foodId was null or undefined when calling foodsFoodIdDelete.');
        }
        if (archive !== undefined) {
                queryParameters.set('archive', <any>archive);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Get food by id, optionally check if editable
     *
     * @param foodId
     * @param editable
     */
    public foodsFoodIdGetWithHttpInfo(foodId: number, editable?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/foods/${foodId}`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'foodId' is not null or undefined
        if (foodId === null || foodId === undefined) {
            throw new Error('Required parameter foodId was null or undefined when calling foodsFoodIdGet.');
        }
        if (editable !== undefined) {
                queryParameters.set('editable', <any>editable);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Updates an existing food
     * Chef can update food name, type, description or price
     * @param foodId
     * @param food The food to be updated
     * @param clone
     */
    public foodsFoodIdPutWithHttpInfo(foodId: number, food: models.EditedFood, clone?: boolean, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/foods/${foodId}`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'foodId' is not null or undefined
        if (foodId === null || foodId === undefined) {
            throw new Error('Required parameter foodId was null or undefined when calling foodsFoodIdPut.');
        }
        // verify required parameter 'food' is not null or undefined
        if (food === null || food === undefined) {
            throw new Error('Required parameter food was null or undefined when calling foodsFoodIdPut.');
        }
        if (clone !== undefined) {
                queryParameters.set('clone', <any>clone);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: food == null ? '' : JSON.stringify(food), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Gets all foods, optionally return stats per food
     * Return a list of all foods
     * @param stats
     * @param page Request pagination page
     * @param size Request pagination size / num of foods
     * @param foodType Request foodType filter
     * @param archived Request archived filter
     * @param orderBy Request orderBy filter
     */
    public foodsGetWithHttpInfo(stats?: boolean, page?: string, size?: string, foodType?: string, archived?: string, orderBy?: string, foods_version?: number, orderDirection?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/foods`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (stats !== undefined) {
                queryParameters.set('stats', <any>stats);
        }

        if (page !== undefined) {
                queryParameters.set('page', <any>page);
        }

        if (size !== undefined) {
                queryParameters.set('size', <any>size);
        }

        if (foodType !== undefined) {
                queryParameters.set('foodType', <any>foodType);
        }

        if (archived !== undefined) {
                queryParameters.set('archived', <any>archived);

        }

        if (orderBy !== undefined) {
                queryParameters.set('orderBy', <any>orderBy);
        }

       if (foods_version !== undefined) {
                queryParameters.set('foods_version', <any>foods_version);
        }

       if (orderDirection !== undefined) {
                queryParameters.set('orderDirection', <any>orderDirection);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * A new food
     * Create a food with basic data
     * @param foodDetails The food to save
     */
    public foodsPostWithHttpInfo(foodDetails?: models.FoodDetails, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/foods`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: foodDetails == null ? '' : JSON.stringify(foodDetails), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Get daily orders summary
     *
     * @param day
     */
    public ordersDailyDayGetWithHttpInfo(day: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/orders/daily/${day}`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'day' is not null or undefined
        if (day === null || day === undefined) {
            throw new Error('Required parameter day was null or undefined when calling ordersDailyDayGet.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Get a summary of orders by month
     *
     */
    public ordersMonthlyGetWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/orders/monthly`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Get a summary of orders by month
     *
     * @param monthyear ex 02-2017
     */
    public ordersMonthlyMonthyearGetWithHttpInfo(monthyear: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/orders/monthly/${monthyear}`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'monthyear' is not null or undefined
        if (monthyear === null || monthyear === undefined) {
            throw new Error('Required parameter monthyear was null or undefined when calling ordersMonthlyMonthyearGet.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        // authentication (Bearer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

}

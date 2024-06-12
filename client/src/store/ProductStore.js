import {makeAutoObservable} from "mobx";

export default class ProductStore{

    constructor() {
        this._brands=[];
        this._users=[];
        this._sections=[];
        this._categories = [];
        this._subcategories = [];
        this._products = [];
        this._carts=[]
        this._cartItems=[]
        this._orders=[]
        this._orderItems=[]
        this._wishList=[]
        this._wishListItems=[]
        this._stores=[]
        this._feedbacks=[]

        this._adminBrands=[];
        this._adminSections=[];
        this._adminCategories = [];
        this._adminSubcategories = [];
        this._adminProducts = [];
        this._adminOrders=[]
        this._adminOrderItems=[]
        this._adminStores=[]


        this._page=1
        this._totalCount=0
        this._limit=9

        this._selectedSections={}
        this._selectedBrand={}
        this._selectedCategories={}
        this._selectedSubcategories={}
        this._selectedStore={}

        this._subcategoriesOfSelectedCategory = []; 
        this._categoriesOfSelectedSection =[];

        this._adminSelectedSections={}
        this._adminSelectedBrand={}
        this._adminSelectedCategories={}
        this._adminSelectedSubcategories={}
        this._adminSelectedProduct={}
        this._adminSelectedStore={}

        this._adminSubcategoriesOfSelectedCategory = []; 
        this._adminCategoriesOfSelectedSection =[];

        makeAutoObservable(this)
    }
    //методы управления корзиной
    setCarts(carts) {
        this._carts= carts
    }
    get carts(){
        return this._carts
    }
    setCartItems(cartItems) {
        this._cartItems= cartItems
    }
    get cartItems(){
        return this._cartItems
    }

    //методы управления Избранным
    setWishList(wishList) {
        this._wishList= wishList
    }
    
    get wishList(){
        return this._wishList
    }

    setWishListItems(wishListItems) {
        this._wishListItems= wishListItems
    }
    get wishListItems(){
        return this._wishListItems
    }

    //методы управления заказами
    setOrders(orders) {
        this._orders=orders
    }
    get orders(){
        return this._orders
    }
    setOrderItems(orderItems) {
        this._orderItems= orderItems
    }
    get orderItems(){
        return this._orderItems
    }
    

    //методы управления пунктами выдачи
    setStores(stores) {
        this._stores=stores
    }
    get stores(){
        return this._stores
    }

    setSelectedStores(stores){
        this._selectedStore=stores;
    }
   
    //методы управления обратной связью
    setFeedback(feedbacks) {
        this._feedbacks=feedbacks
    }
    get feedbacks(){
        return this._feedbacks
    }


//методы управления брендами
    setBrand(brands) {
        this._brands= brands
    }

    adminSetBrand(brands) {
        this._adminBrands= brands
    }

    setSelectedBrand(brands){
        this.setPage(1)
        this._selectedBrand = brands; 
    }

    adminSetSelectedBrand(brands){
        this.setPage(1)
        this._adminSelectedBrand = brands; 
    }
    
//методы управления разделами
    setSections(sections) {
        this._sections = sections
    }

    adminSetSections(sections) {
        this._adminSections = sections
    }

    setSelectedSections(sections){
        this._selectedSections=sections
        this._categoriesOfSelectedSection = this._categories.filter(categories => categories.id_section === sections.id_section);
    }

    adminSetSelectedSections(sections){
        this._adminSelectedSections=sections
        this._adminCategoriesOfSelectedSection = this._categories.filter(categories => categories.id_section === sections.id_section);
    }
    
//методы управления категориями

    setCategories(categories) {
        this._categories = categories
    }

    adminSetCategories(categories) {
        this._adminCategories = categories
    }

    setSelectedCategories(categories){
        this.setPage(1)
        this._selectedCategories=categories
        this._subcategoriesOfSelectedCategory = this._subcategories.filter(subcategories => subcategories.id_category === categories.id_category);
    }

    adminSetSelectedCategories(categories){
        this.setPage(1)
        this._adminSelectedCategories=categories
        this._adminSubcategoriesOfSelectedCategory = this._subcategories.filter(subcategories => subcategories.id_category === categories.id_category);
    }

    setCategoriesOfSelectedSection(categories){
        this._categoriesOfSelectedSection = categories;
    }

    adminSetCategoriesOfSelectedSection(categories){
        this._adminCategoriesOfSelectedSection = categories;
    }

 //методы управления подкатегориями  
    setSubcategories(subcategories) {
    this._subcategories = subcategories;
    }

    adminSetSubcategories(subcategories) {
        this._adminSubcategories = subcategories;
    }
 
    setSelectedSubcategories(subcategories){
      this.setPage(1)
      this._selectedSubcategories=subcategories
    }

    adminSetSelectedSubcategories(subcategories){
        this.setPage(1)
        this._adminSelectedSubcategories=subcategories
    }
  
    setSubcategoriesOfSelectedCategory(subcategories) {
      this._subcategoriesOfSelectedCategory = subcategories;
    }

    adminSetSubcategoriesOfSelectedCategory(subcategories) {
        this._adminSubcategoriesOfSelectedCategory = subcategories;
    }
//методы управления продуктами
    setProducts(products) {
        this._products = products
    }

    adminSetProducts(products) {
        this._adminProducts = products
    }

//Пагинация страниц
    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }

    get products() {
        return this._products
    }

    get brands() {
        return this._brands
    }

    get adminProducts() {
        return this._adminProducts
    }

    get adminSelectedProduct() {
        return this._adminSelectedProduct
    }

    get adminBrands() {
        return this._adminBrands
    }

    get selectedBrand() {
        return this._selectedBrand
    }

    get adminSelectedBrand() {
        return this._adminSelectedBrand
    }

    get sections() {
        return this._sections
    }

    get adminSections() {
        return this._adminSections
    }
    
    get selectedSections() {
        return this._selectedSections
    }

    get adminSelectedSections() {
        return this._adminSelectedSections
    }

    get categories() {
        return this._categories
    }

    get adminCategories() {
        return this._adminCategories
    }

    get selectedCategories() {
        return this._selectedCategories
    }

    get adminSelectedCategories() {
        return this._adminSelectedCategories
    }

    get subcategories() {
        return this._subcategories
    }

    get adminSubcategories() {
        return this._adminSubcategories
    }

    get selectedSubcategories() {
        return this._selectedSubcategories
    }

    get adminSelectedSubcategories() {
        return this._adminSelectedSubcategories
    }

    get subcategoriesOfSelectedCategory() {
        return this._subcategoriesOfSelectedCategory;
    }

    get adminSubcategoriesOfSelectedCategory() {
        return this._adminSubcategoriesOfSelectedCategory;
    }

    get categoriesOfSelectedSection (){
        return this._categoriesOfSelectedSection; 
    }

    get adminCategoriesOfSelectedSection (){
        return this._adminCategoriesOfSelectedSection; 
    }
}
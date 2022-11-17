package com.johnpier.labproject.configs;

public class Routes {
    public static final String REGISTER = Constants.API_VERSION + Paths.Register;
    public static final String AUTH = Constants.API_VERSION + Paths.Auth;
    public static final String ASSETS = Paths.Assets + Paths.Any;
    public static final String LOGOUT = Constants.API_VERSION + Paths.Logout;
    public static final String USERS = Constants.API_VERSION + Paths.Users;
    public static final String ADMIN = Constants.API_VERSION + Paths.Admin;
    public static final String BLOGS = Constants.API_VERSION + Paths.Blogs;
    public static final String COMMENTS = Constants.API_VERSION + Paths.Comments;
    public static final String CATEGORIES = Constants.API_VERSION + Paths.Categories;
    public static final String ROOT = Paths.Index;
    public static final String VIEW_AUTH = Paths.Index;
    public static final String VIEW_REGISTER = Paths.Index;
}

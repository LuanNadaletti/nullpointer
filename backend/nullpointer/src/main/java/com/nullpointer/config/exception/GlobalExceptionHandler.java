package com.nullpointer.config.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Global exception handler for the application.
 *
 * <p>
 * This class is responsible for handling exceptions thrown by controllers and returning appropriate
 * HTTP responses. It uses Spring's {@link RestControllerAdvice} to centralize exception handling
 * across the application.
 * </p>
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles the UserAlreadyExistsException thrown when attempting to create a user
     * that already exists in the system.
     *
     * @param e the UserAlreadyExistsException instance
     * @return a ResponseEntity containing an ErrorResponse with a 409 Conflict status
     */
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.CONFLICT.value(), e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    /**
     * Handles BadCredentialsException thrown during authentication when invalid credentials are provided.
     *
     * @param e the BadCredentialsException instance
     * @return a ResponseEntity containing an ErrorResponse with a 401 Unauthorized status
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException e) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Handles InvalidJwtTokenException thrown when a provided JWT token is invalid.
     *
     * @param e the InvalidJwtTokenException instance
     * @return a ResponseEntity containing an ErrorResponse with a 401 Unauthorized status
     */
    @ExceptionHandler(InvalidJwtTokenException.class)
    public ResponseEntity<ErrorResponse> handleInvalidJwtTokenException(InvalidJwtTokenException e) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Handles generic exceptions that are not specifically handled by other methods.
     * This method captures any unexpected exceptions and returns a 500 Internal Server Error status.
     *
     * @param e the Exception instance
     * @return a ResponseEntity containing an ErrorResponse with a 500 Internal Server Error status
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

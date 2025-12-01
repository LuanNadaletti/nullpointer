package com.nullpointer.domain.mapper;

import com.nullpointer.domain.user.RegistrationRequest;
import com.nullpointer.domain.user.User;
import com.nullpointer.domain.user.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "role", ignore = true)
    @Mapping(target = "password", ignore = true)
    User fromDTO(UserDTO userDTO);

    @Mapping(target = "role", ignore = true)
    @Mapping(target = "registrationDate", ignore = true)
    @Mapping(target = "id", ignore = true)
    User fromRegistrationRequest(RegistrationRequest registrationRequest);

    UserDTO fromEntity(User user);
}

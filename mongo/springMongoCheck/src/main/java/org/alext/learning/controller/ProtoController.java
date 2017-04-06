package org.alext.learning.controller;

/*import com.google.protobuf.ByteString;
import org.alext.learning.model.AddressBookProtos;*/
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 * Created by alex on 1/10/2017.
 */
@RestController
@RequestMapping(value = "/proto")
public class ProtoController {

    @RequestMapping(value = "/echo",method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public byte[] echo(){
       /* AddressBookProtos.Person.PhoneNumber homeNumber = AddressBookProtos.Person.PhoneNumber.newBuilder().setNumber("111-11-111").setType(AddressBookProtos.Person.PhoneType.HOME).build();
        AddressBookProtos.Person.PhoneNumber mobileNumber = AddressBookProtos.Person.PhoneNumber.newBuilder().setNumber("222-22-222").setType(AddressBookProtos.Person.PhoneType.MOBILE).build();
        AddressBookProtos.Person manOne = AddressBookProtos.Person.newBuilder().setEmail("person@email.com").setId(1).setName("Mister One").addPhone(homeNumber).addPhone(mobileNumber).build();

        return manOne.toByteArray();*/
       /*ByteString bs=ByteString.copyFrom(new byte[]{1,2,3,4});

        AddressBookProtos.Echo alex = AddressBookProtos.Echo.newBuilder()
                .setName("alex")
                .setAge(35)
                .setPayload(bs)
                .setTag("END")
                .build();

        return alex.toByteArray();*/
        return null;
    }

    @RequestMapping(value = "/version")
    public String version(){
        return "Test Endpoint for Proto ";
    }
}

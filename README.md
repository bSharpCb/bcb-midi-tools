# midikeys
browser keyboard that reads MIDI input

various technical details that are helpful to know:

message.data = Uint8Array containing the data bytes of a single MIDI message
midi specs: midi.org/specifications-old/item/table-1-summary-of-midi-message

values in decimal by default, convert to hex when referencing specs

message.data[0]: status/event (e.g. 144:note on, 128:note off)

data[1,2] content/formats depends on the event
some events won't return data[2] at all (e.g. 208:after-touch, only returns pressure value)

when data[0] = 144 || 128:
message.data[1]: note number
message.data[2]: velocity 0-127

other data[0] values:
248: Timing Clock. Sent 24 times per quarter note
254: Active Sensing. Sent repeatedly to tell the receiver that connection is alive

For my own keyboard, middle C is note 60- this demo utilizes 2 octaves

sample ABC notation (donna lee)
right
z4(3gag f=e|_edcB =ACEF|(3_GAG FE =DFAc|GF z2 z2 =E=D
left
[A,,E,C]8|[F,,E,=A,]8|[B,,=D,A,]8


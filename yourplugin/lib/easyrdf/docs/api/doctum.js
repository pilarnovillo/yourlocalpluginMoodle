

(function(root) {

    var bhIndex = null;
    var rootPath = '';
    var treeHtml = '<ul><li data-name="namespace:EasyRdf" class="opened"><div style="padding-left:0px" class="hd"><span class="icon icon-play"></span><a href="EasyRdf.html">EasyRdf</a></div><div class="bd"><ul><li data-name="namespace:EasyRdf_Http" ><div style="padding-left:18px" class="hd"><span class="icon icon-play"></span><a href="EasyRdf/Http.html">Http</a></div><div class="bd"><ul><li data-name="class:EasyRdf_Http_Client" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Http/Client.html">Client</a></div></li><li data-name="class:EasyRdf_Http_Exception" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Http/Exception.html">Exception</a></div></li><li data-name="class:EasyRdf_Http_Response" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Http/Response.html">Response</a></div></li></ul></div></li><li data-name="namespace:EasyRdf_Literal" ><div style="padding-left:18px" class="hd"><span class="icon icon-play"></span><a href="EasyRdf/Literal.html">Literal</a></div><div class="bd"><ul><li data-name="class:EasyRdf_Literal_Boolean" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Literal/Boolean.html">Boolean</a></div></li><li data-name="class:EasyRdf_Literal_Date" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Literal/Date.html">Date</a></div></li><li data-name="class:EasyRdf_Literal_DateTime" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Literal/DateTime.html">DateTime</a></div></li><li data-name="class:EasyRdf_Literal_Decimal" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Literal/Decimal.html">Decimal</a></div></li><li data-name="class:EasyRdf_Literal_HTML" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Literal/HTML.html">HTML</a></div></li><li data-name="class:EasyRdf_Literal_HexBinary" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Literal/HexBinary.html">HexBinary</a></div></li><li data-name="class:EasyRdf_Literal_Integer" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Literal/Integer.html">Integer</a></div></li><li data-name="class:EasyRdf_Literal_XML" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Literal/XML.html">XML</a></div></li></ul></div></li><li data-name="namespace:EasyRdf_Parser" ><div style="padding-left:18px" class="hd"><span class="icon icon-play"></span><a href="EasyRdf/Parser.html">Parser</a></div><div class="bd"><ul><li data-name="class:EasyRdf_Parser_Arc" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Parser/Arc.html">Arc</a></div></li><li data-name="class:EasyRdf_Parser_Exception" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Parser/Exception.html">Exception</a></div></li><li data-name="class:EasyRdf_Parser_Json" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Parser/Json.html">Json</a></div></li><li data-name="class:EasyRdf_Parser_JsonLd" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Parser/JsonLd.html">JsonLd</a></div></li><li data-name="class:EasyRdf_Parser_Ntriples" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Parser/Ntriples.html">Ntriples</a></div></li><li data-name="class:EasyRdf_Parser_Rapper" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Parser/Rapper.html">Rapper</a></div></li><li data-name="class:EasyRdf_Parser_RdfPhp" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Parser/RdfPhp.html">RdfPhp</a></div></li><li data-name="class:EasyRdf_Parser_RdfXml" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Parser/RdfXml.html">RdfXml</a></div></li><li data-name="class:EasyRdf_Parser_Rdfa" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Parser/Rdfa.html">Rdfa</a></div></li><li data-name="class:EasyRdf_Parser_Turtle" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Parser/Turtle.html">Turtle</a></div></li></ul></div></li><li data-name="namespace:EasyRdf_Serialiser" ><div style="padding-left:18px" class="hd"><span class="icon icon-play"></span><a href="EasyRdf/Serialiser.html">Serialiser</a></div><div class="bd"><ul><li data-name="class:EasyRdf_Serialiser_Arc" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Serialiser/Arc.html">Arc</a></div></li><li data-name="class:EasyRdf_Serialiser_GraphViz" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Serialiser/GraphViz.html">GraphViz</a></div></li><li data-name="class:EasyRdf_Serialiser_Json" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Serialiser/Json.html">Json</a></div></li><li data-name="class:EasyRdf_Serialiser_JsonLd" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Serialiser/JsonLd.html">JsonLd</a></div></li><li data-name="class:EasyRdf_Serialiser_Ntriples" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Serialiser/Ntriples.html">Ntriples</a></div></li><li data-name="class:EasyRdf_Serialiser_Rapper" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Serialiser/Rapper.html">Rapper</a></div></li><li data-name="class:EasyRdf_Serialiser_RdfPhp" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Serialiser/RdfPhp.html">RdfPhp</a></div></li><li data-name="class:EasyRdf_Serialiser_RdfXml" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Serialiser/RdfXml.html">RdfXml</a></div></li><li data-name="class:EasyRdf_Serialiser_Turtle" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Serialiser/Turtle.html">Turtle</a></div></li></ul></div></li><li data-name="namespace:EasyRdf_Sparql" ><div style="padding-left:18px" class="hd"><span class="icon icon-play"></span><a href="EasyRdf/Sparql.html">Sparql</a></div><div class="bd"><ul><li data-name="class:EasyRdf_Sparql_Client" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Sparql/Client.html">Client</a></div></li><li data-name="class:EasyRdf_Sparql_Result" ><div style="padding-left:44px" class="hd leaf"><a href="EasyRdf/Sparql/Result.html">Result</a></div></li></ul></div></li><li data-name="class:EasyRdf_Collection" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/Collection.html">Collection</a></div></li><li data-name="class:EasyRdf_Container" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/Container.html">Container</a></div></li><li data-name="class:EasyRdf_Exception" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/Exception.html">Exception</a></div></li><li data-name="class:EasyRdf_Format" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/Format.html">Format</a></div></li><li data-name="class:EasyRdf_Graph" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/Graph.html">Graph</a></div></li><li data-name="class:EasyRdf_GraphStore" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/GraphStore.html">GraphStore</a></div></li><li data-name="class:EasyRdf_Http" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/Http.html">Http</a></div></li><li data-name="class:EasyRdf_Isomorphic" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/Isomorphic.html">Isomorphic</a></div></li><li data-name="class:EasyRdf_Literal" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/Literal.html">Literal</a></div></li><li data-name="class:EasyRdf_ParsedUri" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/ParsedUri.html">ParsedUri</a></div></li><li data-name="class:EasyRdf_Parser" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/Parser.html">Parser</a></div></li><li data-name="class:EasyRdf_RdfNamespace" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/RdfNamespace.html">RdfNamespace</a></div></li><li data-name="class:EasyRdf_Resource" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/Resource.html">Resource</a></div></li><li data-name="class:EasyRdf_Serialiser" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/Serialiser.html">Serialiser</a></div></li><li data-name="class:EasyRdf_TypeMapper" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/TypeMapper.html">TypeMapper</a></div></li><li data-name="class:EasyRdf_Utils" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/Utils.html">Utils</a></div></li><li data-name="class:EasyRdf_XMLParser" ><div style="padding-left:26px" class="hd leaf"><a href="EasyRdf/XMLParser.html">XMLParser</a></div></li></ul></div></li></ul>';

    var searchTypeClasses = {
        'Namespace': 'label-default',
        'Class': 'label-info',
        'Interface': 'label-primary',
        'Trait': 'label-success',
        'Method': 'label-danger',
        '_': 'label-warning'
    };

    var searchIndex = [
                        {"type":"Namespace","link":"EasyRdf.html","name":"EasyRdf","doc":"Namespace EasyRdf"},{"type":"Namespace","link":"EasyRdf/Http.html","name":"EasyRdf\\Http","doc":"Namespace EasyRdf\\Http"},{"type":"Namespace","link":"EasyRdf/Literal.html","name":"EasyRdf\\Literal","doc":"Namespace EasyRdf\\Literal"},{"type":"Namespace","link":"EasyRdf/Parser.html","name":"EasyRdf\\Parser","doc":"Namespace EasyRdf\\Parser"},{"type":"Namespace","link":"EasyRdf/Serialiser.html","name":"EasyRdf\\Serialiser","doc":"Namespace EasyRdf\\Serialiser"},{"type":"Namespace","link":"EasyRdf/Sparql.html","name":"EasyRdf\\Sparql","doc":"Namespace EasyRdf\\Sparql"},                                                        {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/Collection.html","name":"EasyRdf\\Collection","doc":"Sub-class of EasyRdf\\Resource that represents an RDF collection (rdf:List)"},
                                {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method___construct","name":"EasyRdf\\Collection::__construct","doc":"Create a new collection - do not use this directly"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_seek","name":"EasyRdf\\Collection::seek","doc":"Seek to a specific position in the container"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_rewind","name":"EasyRdf\\Collection::rewind","doc":"Rewind the iterator back to the start of the collection"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_current","name":"EasyRdf\\Collection::current","doc":"Return the current item in the collection"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_key","name":"EasyRdf\\Collection::key","doc":"Return the key / current position in the collection"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_next","name":"EasyRdf\\Collection::next","doc":"Move forward to next item in the collection"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_valid","name":"EasyRdf\\Collection::valid","doc":"Checks if current position is valid"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_getCollectionNode","name":"EasyRdf\\Collection::getCollectionNode","doc":"Get a node for a particular offset into the collection"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_count","name":"EasyRdf\\Collection::count","doc":"Counts the number of items in the collection"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_append","name":"EasyRdf\\Collection::append","doc":"Append an item to the end of the collection"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_offsetExists","name":"EasyRdf\\Collection::offsetExists","doc":"Array Access: check if a position exists in collection using array syntax"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_offsetGet","name":"EasyRdf\\Collection::offsetGet","doc":"Array Access: get an item at a specified position in collection using array syntax"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_offsetSet","name":"EasyRdf\\Collection::offsetSet","doc":"Array Access: set an item at a positon in collection using array syntax"},
        {"type":"Method","fromName":"EasyRdf\\Collection","fromLink":"EasyRdf/Collection.html","link":"EasyRdf/Collection.html#method_offsetUnset","name":"EasyRdf\\Collection::offsetUnset","doc":"Array Access: delete an item at a specific postion using array syntax"},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/Container.html","name":"EasyRdf\\Container","doc":"Sub-class of EasyRdf\\Resource that represents an RDF container\n(rdf:Alt, rdf:Bag and rdf:Seq)"},
                                {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method___construct","name":"EasyRdf\\Container::__construct","doc":"Create a new container - do not use this directly"},
        {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method_seek","name":"EasyRdf\\Container::seek","doc":"Seek to a specific position in the container"},
        {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method_rewind","name":"EasyRdf\\Container::rewind","doc":"Rewind the iterator back to the start of the container (item 1)"},
        {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method_current","name":"EasyRdf\\Container::current","doc":"Return the current item in the container"},
        {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method_key","name":"EasyRdf\\Container::key","doc":"Return the key / current position in the container"},
        {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method_next","name":"EasyRdf\\Container::next","doc":"Move forward to next item in the container"},
        {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method_valid","name":"EasyRdf\\Container::valid","doc":"Checks if current position is valid"},
        {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method_count","name":"EasyRdf\\Container::count","doc":"Counts the number of items in the container"},
        {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method_append","name":"EasyRdf\\Container::append","doc":"Append an item to the end of the container"},
        {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method_offsetExists","name":"EasyRdf\\Container::offsetExists","doc":"Array Access: check if a position exists in container using array syntax"},
        {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method_offsetGet","name":"EasyRdf\\Container::offsetGet","doc":"Array Access: get an item at a specified position in container using array syntax"},
        {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method_offsetSet","name":"EasyRdf\\Container::offsetSet","doc":"Array Access: set an item at a positon in container using array syntax"},
        {"type":"Method","fromName":"EasyRdf\\Container","fromLink":"EasyRdf/Container.html","link":"EasyRdf/Container.html#method_offsetUnset","name":"EasyRdf\\Container::offsetUnset","doc":"Array Access: delete an item at a specific postion using array syntax"},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/Exception.html","name":"EasyRdf\\Exception","doc":"EasyRdf Exception class"},
                
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/Format.html","name":"EasyRdf\\Format","doc":"Class the represents an RDF file format."},
                                {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getNames","name":"EasyRdf\\Format::getNames","doc":"Get a list of format names"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getFormats","name":"EasyRdf\\Format::getFormats","doc":"Get a list of all the registered formats"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getHttpAcceptHeader","name":"EasyRdf\\Format::getHttpAcceptHeader","doc":"Generates an HTTP Accept header string"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_formatAcceptHeader","name":"EasyRdf\\Format::formatAcceptHeader","doc":"Convert array of types to Accept header value"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_formatExists","name":"EasyRdf\\Format::formatExists","doc":"Check if a named graph exists"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getFormat","name":"EasyRdf\\Format::getFormat","doc":"Get a EasyRdf\\Format from a name, uri or mime type"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_register","name":"EasyRdf\\Format::register","doc":"Register a new format"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_unregister","name":"EasyRdf\\Format::unregister","doc":"Remove a format from the registry"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_registerParser","name":"EasyRdf\\Format::registerParser","doc":"Class method to register a parser class to a format name"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_registerSerialiser","name":"EasyRdf\\Format::registerSerialiser","doc":"Class method to register a serialiser class to a format name"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_guessFormat","name":"EasyRdf\\Format::guessFormat","doc":"Attempt to guess the document format from some content."},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method___construct","name":"EasyRdf\\Format::__construct","doc":"This constructor is for internal use only."},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getName","name":"EasyRdf\\Format::getName","doc":"Get the name of a format object"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getLabel","name":"EasyRdf\\Format::getLabel","doc":"Get the label for a format object"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_setLabel","name":"EasyRdf\\Format::setLabel","doc":"Set the label for a format object"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getUri","name":"EasyRdf\\Format::getUri","doc":"Get the URI for a format object"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_setUri","name":"EasyRdf\\Format::setUri","doc":"Set the URI for a format object"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getDefaultMimeType","name":"EasyRdf\\Format::getDefaultMimeType","doc":"Get the default registered mime type for a format object"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getMimeTypes","name":"EasyRdf\\Format::getMimeTypes","doc":"Get all the registered mime types for a format object"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_setMimeTypes","name":"EasyRdf\\Format::setMimeTypes","doc":"Set the MIME Types for a format object"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getDefaultExtension","name":"EasyRdf\\Format::getDefaultExtension","doc":"Get the default registered file extension (filename suffix) for a format object"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getExtensions","name":"EasyRdf\\Format::getExtensions","doc":"Get all the registered file extensions (filename suffix) for a format object"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_setExtensions","name":"EasyRdf\\Format::setExtensions","doc":"Set the file format extensions (filename suffix) for a format object"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_setParserClass","name":"EasyRdf\\Format::setParserClass","doc":"Set the parser to use for a format"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getParserClass","name":"EasyRdf\\Format::getParserClass","doc":"Get the name of the class to use to parse the format"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_newParser","name":"EasyRdf\\Format::newParser","doc":"Create a new parser to parse this format"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_setSerialiserClass","name":"EasyRdf\\Format::setSerialiserClass","doc":"Set the serialiser to use for a format"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_getSerialiserClass","name":"EasyRdf\\Format::getSerialiserClass","doc":"Get the name of the class to use to serialise the format"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method_newSerialiser","name":"EasyRdf\\Format::newSerialiser","doc":"Create a new serialiser to parse this format"},
        {"type":"Method","fromName":"EasyRdf\\Format","fromLink":"EasyRdf/Format.html","link":"EasyRdf/Format.html#method___toString","name":"EasyRdf\\Format::__toString","doc":"Magic method to return the name of the format when casted to string"},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/Graph.html","name":"EasyRdf\\Graph","doc":"Container for collection of EasyRdf\\Resource objects."},
                                {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method___construct","name":"EasyRdf\\Graph::__construct","doc":"Constructor"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_newAndLoad","name":"EasyRdf\\Graph::newAndLoad","doc":"Create a new graph and load RDF data from a URI into it"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_resource","name":"EasyRdf\\Graph::resource","doc":"Get or create a resource stored in a graph"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_classForResource","name":"EasyRdf\\Graph::classForResource","doc":"Work out the class to instantiate a resource as"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_newBNode","name":"EasyRdf\\Graph::newBNode","doc":"Create a new blank node in the graph and return it."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_newBNodeId","name":"EasyRdf\\Graph::newBNodeId","doc":"Create a new unique blank node identifier and return it."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_parse","name":"EasyRdf\\Graph::parse","doc":"Parse some RDF data into the graph object."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_parseFile","name":"EasyRdf\\Graph::parseFile","doc":"Parse a file containing RDF data into the graph object."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_load","name":"EasyRdf\\Graph::load","doc":"Load RDF data into the graph from a URI."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_resources","name":"EasyRdf\\Graph::resources","doc":"Get an associative array of all the resources stored in the graph."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_resourcesMatching","name":"EasyRdf\\Graph::resourcesMatching","doc":"Get an arry of resources matching a certain property and optional value."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_getUri","name":"EasyRdf\\Graph::getUri","doc":"Get the URI of the graph"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_checkResourceParam","name":"EasyRdf\\Graph::checkResourceParam","doc":"Check that a URI/resource parameter is valid, and convert it to a string"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_checkSinglePropertyParam","name":"EasyRdf\\Graph::checkSinglePropertyParam","doc":"Check that a single URI/property parameter (not a property path)\n is valid, and expand it if required"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_checkValueParam","name":"EasyRdf\\Graph::checkValueParam","doc":"Check that a value parameter is valid, and convert it to an associative array if needed"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_get","name":"EasyRdf\\Graph::get","doc":"Get a single value for a property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_getSingleProperty","name":"EasyRdf\\Graph::getSingleProperty","doc":"Get a single value for a property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_getLiteral","name":"EasyRdf\\Graph::getLiteral","doc":"Get a single literal value for a property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_getResource","name":"EasyRdf\\Graph::getResource","doc":"Get a single resource value for a property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_propertyValuesArray","name":"EasyRdf\\Graph::propertyValuesArray","doc":"Return all the values for a particular property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_arrayToObject","name":"EasyRdf\\Graph::arrayToObject","doc":"Get an EasyRdf\\Resource or EasyRdf\\Literal object from an associative array."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_all","name":"EasyRdf\\Graph::all","doc":"Get all values for a property path"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_allForSingleProperty","name":"EasyRdf\\Graph::allForSingleProperty","doc":"Get all values for a single property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_allLiterals","name":"EasyRdf\\Graph::allLiterals","doc":"Get all literal values for a property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_allResources","name":"EasyRdf\\Graph::allResources","doc":"Get all resources for a property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_allOfType","name":"EasyRdf\\Graph::allOfType","doc":"Get all the resources in the graph of a certain type"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_countValues","name":"EasyRdf\\Graph::countValues","doc":"Count the number of values for a property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_join","name":"EasyRdf\\Graph::join","doc":"Concatenate all values for a property of a resource into a string."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_add","name":"EasyRdf\\Graph::add","doc":"Add data to the graph"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_addLiteral","name":"EasyRdf\\Graph::addLiteral","doc":"Add a literal value as a property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_addResource","name":"EasyRdf\\Graph::addResource","doc":"Add a resource as a property of another resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_set","name":"EasyRdf\\Graph::set","doc":"Set a value for a property"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_delete","name":"EasyRdf\\Graph::delete","doc":"Delete a property (or optionally just a specific value)"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_deleteSingleProperty","name":"EasyRdf\\Graph::deleteSingleProperty","doc":"Delete a property (or optionally just a specific value)"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_deleteResource","name":"EasyRdf\\Graph::deleteResource","doc":"Delete a resource from a property of another resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_deleteLiteral","name":"EasyRdf\\Graph::deleteLiteral","doc":"Delete a literal value from a property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_deleteInverse","name":"EasyRdf\\Graph::deleteInverse","doc":"This function is for internal use only."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_isEmpty","name":"EasyRdf\\Graph::isEmpty","doc":"Check if the graph contains any statements"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_properties","name":"EasyRdf\\Graph::properties","doc":"Get a list of all the shortened property names (qnames) for a resource."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_propertyUris","name":"EasyRdf\\Graph::propertyUris","doc":"Get a list of the full URIs for the properties of a resource."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_reversePropertyUris","name":"EasyRdf\\Graph::reversePropertyUris","doc":"Get a list of the full URIs for the properties that point to a resource."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_hasProperty","name":"EasyRdf\\Graph::hasProperty","doc":"Check to see if a property exists for a resource."},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_serialise","name":"EasyRdf\\Graph::serialise","doc":"Serialise the graph into RDF"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_dump","name":"EasyRdf\\Graph::dump","doc":"Return a human readable view of all the resources in the graph"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_dumpResource","name":"EasyRdf\\Graph::dumpResource","doc":"Return a human readable view of a resource and its properties"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_type","name":"EasyRdf\\Graph::type","doc":"Get the resource type of the graph"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_typeAsResource","name":"EasyRdf\\Graph::typeAsResource","doc":"Get the resource type of the graph as a EasyRdf\\Resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_types","name":"EasyRdf\\Graph::types","doc":"Get a list of types for a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_typesAsResources","name":"EasyRdf\\Graph::typesAsResources","doc":"Get the resource types of the graph as a EasyRdf\\Resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_isA","name":"EasyRdf\\Graph::isA","doc":"Check if a resource is of the specified type"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_addType","name":"EasyRdf\\Graph::addType","doc":"Add one or more rdf:type properties to a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_setType","name":"EasyRdf\\Graph::setType","doc":"Change the rdf:type property for a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_label","name":"EasyRdf\\Graph::label","doc":"Get a human readable label for a resource"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_primaryTopic","name":"EasyRdf\\Graph::primaryTopic","doc":"Get the primary topic of the graph"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_toRdfPhp","name":"EasyRdf\\Graph::toRdfPhp","doc":"Returns the graph as a RDF/PHP associative array"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method_countTriples","name":"EasyRdf\\Graph::countTriples","doc":"Calculates the number of triples in the graph"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method___toString","name":"EasyRdf\\Graph::__toString","doc":"Magic method to return URI of resource when casted to string"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method___get","name":"EasyRdf\\Graph::__get","doc":"Magic method to get a property of the graph"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method___set","name":"EasyRdf\\Graph::__set","doc":"Magic method to set the value for a property of the graph"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method___isset","name":"EasyRdf\\Graph::__isset","doc":"Magic method to check if a property exists"},
        {"type":"Method","fromName":"EasyRdf\\Graph","fromLink":"EasyRdf/Graph.html","link":"EasyRdf/Graph.html#method___unset","name":"EasyRdf\\Graph::__unset","doc":"Magic method to delete a property of the graph"},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/GraphStore.html","name":"EasyRdf\\GraphStore","doc":"A class for fetching, saving and deleting graphs to a Graph Store."},
                                {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method___construct","name":"EasyRdf\\GraphStore::__construct","doc":"Create a new SPARQL Graph Store client"},
        {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method_getUri","name":"EasyRdf\\GraphStore::getUri","doc":"Get the URI of the graph store"},
        {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method_get","name":"EasyRdf\\GraphStore::get","doc":"Fetch a named graph from the graph store"},
        {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method_getDefault","name":"EasyRdf\\GraphStore::getDefault","doc":"Fetch default graph from the graph store"},
        {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method_sendGraph","name":"EasyRdf\\GraphStore::sendGraph","doc":"Send some graph data to the graph store"},
        {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method_replace","name":"EasyRdf\\GraphStore::replace","doc":"Replace the contents of a graph in the graph store with new data"},
        {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method_replaceDefault","name":"EasyRdf\\GraphStore::replaceDefault","doc":"Replace the contents of default graph in the graph store with new data"},
        {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method_insert","name":"EasyRdf\\GraphStore::insert","doc":"Add data to a graph in the graph store"},
        {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method_insertIntoDefault","name":"EasyRdf\\GraphStore::insertIntoDefault","doc":"Add data to default graph of the graph store"},
        {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method_delete","name":"EasyRdf\\GraphStore::delete","doc":"Delete named graph content from the graph store"},
        {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method_deleteDefault","name":"EasyRdf\\GraphStore::deleteDefault","doc":"Delete default graph content from the graph store"},
        {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method_urlForGraph","name":"EasyRdf\\GraphStore::urlForGraph","doc":"Work out the full URL for a graph store request."},
        {"type":"Method","fromName":"EasyRdf\\GraphStore","fromLink":"EasyRdf/GraphStore.html","link":"EasyRdf/GraphStore.html#method___toString","name":"EasyRdf\\GraphStore::__toString","doc":"Magic method to return URI of the graph store when casted to string"},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/Http.html","name":"EasyRdf\\Http","doc":"Static class to set the HTTP client used by EasyRdf"},
                                {"type":"Method","fromName":"EasyRdf\\Http","fromLink":"EasyRdf/Http.html","link":"EasyRdf/Http.html#method_setDefaultHttpClient","name":"EasyRdf\\Http::setDefaultHttpClient","doc":"Set the HTTP Client object used to fetch RDF data"},
        {"type":"Method","fromName":"EasyRdf\\Http","fromLink":"EasyRdf/Http.html","link":"EasyRdf/Http.html#method_getDefaultHttpClient","name":"EasyRdf\\Http::getDefaultHttpClient","doc":"Get the HTTP Client object used to fetch RDF data"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Http","fromLink":"EasyRdf/Http.html","link":"EasyRdf/Http/Client.html","name":"EasyRdf\\Http\\Client","doc":"This class is an implemetation of an HTTP client in PHP."},
                                {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method___construct","name":"EasyRdf\\Http\\Client::__construct","doc":"Constructor method. Will create a new HTTP client. Accepts the target\nURL and optionally configuration array."},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_setUri","name":"EasyRdf\\Http\\Client::setUri","doc":"Set the URI for the next request"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_getUri","name":"EasyRdf\\Http\\Client::getUri","doc":"Get the URI for the next request"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_setConfig","name":"EasyRdf\\Http\\Client::setConfig","doc":"Set configuration parameters for this HTTP client"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_setHeaders","name":"EasyRdf\\Http\\Client::setHeaders","doc":"Set a request header"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_setMethod","name":"EasyRdf\\Http\\Client::setMethod","doc":"Set the next request's method"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_getMethod","name":"EasyRdf\\Http\\Client::getMethod","doc":"Get the method for the next request"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_getHeader","name":"EasyRdf\\Http\\Client::getHeader","doc":"Get the value of a specific header"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_setParameterGet","name":"EasyRdf\\Http\\Client::setParameterGet","doc":"Set a GET parameter for the request."},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_getParameterGet","name":"EasyRdf\\Http\\Client::getParameterGet","doc":"Get a GET parameter for the request."},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_getParametersGet","name":"EasyRdf\\Http\\Client::getParametersGet","doc":"Get all the GET parameters"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_getRedirectionsCount","name":"EasyRdf\\Http\\Client::getRedirectionsCount","doc":"Get the number of redirections done on the last request"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_setRawData","name":"EasyRdf\\Http\\Client::setRawData","doc":"Set the raw (already encoded) POST data."},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_getRawData","name":"EasyRdf\\Http\\Client::getRawData","doc":"Get the raw (already encoded) POST data."},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_resetParameters","name":"EasyRdf\\Http\\Client::resetParameters","doc":"Clear all GET and POST parameters"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_request","name":"EasyRdf\\Http\\Client::request","doc":"Send the HTTP request and return an HTTP response object"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Client","fromLink":"EasyRdf/Http/Client.html","link":"EasyRdf/Http/Client.html#method_prepareHeaders","name":"EasyRdf\\Http\\Client::prepareHeaders","doc":"Prepare the request headers"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Http","fromLink":"EasyRdf/Http.html","link":"EasyRdf/Http/Exception.html","name":"EasyRdf\\Http\\Exception","doc":null},
                                {"type":"Method","fromName":"EasyRdf\\Http\\Exception","fromLink":"EasyRdf/Http/Exception.html","link":"EasyRdf/Http/Exception.html#method___construct","name":"EasyRdf\\Http\\Exception::__construct","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Http\\Exception","fromLink":"EasyRdf/Http/Exception.html","link":"EasyRdf/Http/Exception.html#method_getBody","name":"EasyRdf\\Http\\Exception::getBody","doc":null},
            
                                                {"type":"Class","fromName":"EasyRdf\\Http","fromLink":"EasyRdf/Http.html","link":"EasyRdf/Http/Response.html","name":"EasyRdf\\Http\\Response","doc":"Class that represents an HTTP 1.0 / 1.1 response message."},
                                {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method___construct","name":"EasyRdf\\Http\\Response::__construct","doc":"Constructor."},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_isSuccessful","name":"EasyRdf\\Http\\Response::isSuccessful","doc":"Check whether the response in successful"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_isError","name":"EasyRdf\\Http\\Response::isError","doc":"Check whether the response is an error"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_isRedirect","name":"EasyRdf\\Http\\Response::isRedirect","doc":"Check whether the response is a redirection"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_getStatus","name":"EasyRdf\\Http\\Response::getStatus","doc":"Get the HTTP response status code"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_getMessage","name":"EasyRdf\\Http\\Response::getMessage","doc":"Return a message describing the HTTP response code\n(Eg. \"OK\", \"Not Found\", \"Moved Permanently\")"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_getBody","name":"EasyRdf\\Http\\Response::getBody","doc":"Get the response body as string"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_getRawBody","name":"EasyRdf\\Http\\Response::getRawBody","doc":"Get the raw response body (as transfered \"on wire\") as string"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_getVersion","name":"EasyRdf\\Http\\Response::getVersion","doc":"Get the HTTP version of the response"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_getHeaders","name":"EasyRdf\\Http\\Response::getHeaders","doc":"Get the response headers"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_getHeader","name":"EasyRdf\\Http\\Response::getHeader","doc":"Get a specific header as string, or null if it is not set"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_getHeadersAsString","name":"EasyRdf\\Http\\Response::getHeadersAsString","doc":"Get all headers as string"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_fromString","name":"EasyRdf\\Http\\Response::fromString","doc":"Create an EasyRdf\\Http\\Response object from a HTTP response string"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_decodeChunkedBody","name":"EasyRdf\\Http\\Response::decodeChunkedBody","doc":"Decode a \"chunked\" transfer-encoded body and return the decoded text"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_decodeGzip","name":"EasyRdf\\Http\\Response::decodeGzip","doc":"Decode a gzip encoded message (when Content-encoding = gzip)"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_decodeDeflate","name":"EasyRdf\\Http\\Response::decodeDeflate","doc":"Decode a zlib deflated message (when Content-encoding = deflate)"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method_asString","name":"EasyRdf\\Http\\Response::asString","doc":"Get the entire response as string"},
        {"type":"Method","fromName":"EasyRdf\\Http\\Response","fromLink":"EasyRdf/Http/Response.html","link":"EasyRdf/Http/Response.html#method___toString","name":"EasyRdf\\Http\\Response::__toString","doc":"Implements magic __toString()"},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/Isomorphic.html","name":"EasyRdf\\Isomorphic","doc":"Functions for comparing two graphs with each other"},
                                {"type":"Method","fromName":"EasyRdf\\Isomorphic","fromLink":"EasyRdf/Isomorphic.html","link":"EasyRdf/Isomorphic.html#method_isomorphic","name":"EasyRdf\\Isomorphic::isomorphic","doc":"Check if one graph is isomorphic (equal) to another graph"},
        {"type":"Method","fromName":"EasyRdf\\Isomorphic","fromLink":"EasyRdf/Isomorphic.html","link":"EasyRdf/Isomorphic.html#method_bijectionBetween","name":"EasyRdf\\Isomorphic::bijectionBetween","doc":"Returns an associative array of bnode identifiers representing an isomorphic\nbijection of one EasyRdf\\Graph to another EasyRdf\\Graph's blank nodes or\nnull if a bijection cannot be found."},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/Literal.html","name":"EasyRdf\\Literal","doc":"Class that represents an RDF Literal"},
                                {"type":"Method","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal.html#method_create","name":"EasyRdf\\Literal::create","doc":"Create a new literal object"},
        {"type":"Method","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal.html#method_setDatatypeMapping","name":"EasyRdf\\Literal::setDatatypeMapping","doc":"Register an RDF datatype with a PHP class name"},
        {"type":"Method","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal.html#method_deleteDatatypeMapping","name":"EasyRdf\\Literal::deleteDatatypeMapping","doc":"Remove the mapping between an RDF datatype and a PHP class name"},
        {"type":"Method","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal.html#method_getDatatypeForValue","name":"EasyRdf\\Literal::getDatatypeForValue","doc":"Get datatype URI for a PHP value."},
        {"type":"Method","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal.html#method___construct","name":"EasyRdf\\Literal::__construct","doc":"Constructor for creating a new literal"},
        {"type":"Method","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal.html#method_getValue","name":"EasyRdf\\Literal::getValue","doc":"Returns the value of the literal."},
        {"type":"Method","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal.html#method_getDatatypeUri","name":"EasyRdf\\Literal::getDatatypeUri","doc":"Returns the full datatype URI of the literal."},
        {"type":"Method","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal.html#method_getDatatype","name":"EasyRdf\\Literal::getDatatype","doc":"Returns the shortened datatype URI of the literal."},
        {"type":"Method","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal.html#method_getLang","name":"EasyRdf\\Literal::getLang","doc":"Returns the language of the literal."},
        {"type":"Method","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal.html#method_toRdfPhp","name":"EasyRdf\\Literal::toRdfPhp","doc":"Returns the properties of the literal as an associative array"},
        {"type":"Method","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal.html#method___toString","name":"EasyRdf\\Literal::__toString","doc":"Magic method to return the value of a literal as a string"},
        {"type":"Method","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal.html#method_dumpValue","name":"EasyRdf\\Literal::dumpValue","doc":"Return pretty-print view of the literal"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal/Boolean.html","name":"EasyRdf\\Literal\\Boolean","doc":"Class that represents an RDF Literal of datatype xsd:boolean"},
                                {"type":"Method","fromName":"EasyRdf\\Literal\\Boolean","fromLink":"EasyRdf/Literal/Boolean.html","link":"EasyRdf/Literal/Boolean.html#method___construct","name":"EasyRdf\\Literal\\Boolean::__construct","doc":"Constructor for creating a new boolean literal"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Boolean","fromLink":"EasyRdf/Literal/Boolean.html","link":"EasyRdf/Literal/Boolean.html#method_getValue","name":"EasyRdf\\Literal\\Boolean::getValue","doc":"Return the value of the literal cast to a PHP bool"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Boolean","fromLink":"EasyRdf/Literal/Boolean.html","link":"EasyRdf/Literal/Boolean.html#method_isTrue","name":"EasyRdf\\Literal\\Boolean::isTrue","doc":"Return true if the value of the literal is 'true' or '1'"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Boolean","fromLink":"EasyRdf/Literal/Boolean.html","link":"EasyRdf/Literal/Boolean.html#method_isFalse","name":"EasyRdf\\Literal\\Boolean::isFalse","doc":"Return true if the value of the literal is 'false' or '0'"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal/Date.html","name":"EasyRdf\\Literal\\Date","doc":"Class that represents an RDF Literal of datatype xsd:date"},
                                {"type":"Method","fromName":"EasyRdf\\Literal\\Date","fromLink":"EasyRdf/Literal/Date.html","link":"EasyRdf/Literal/Date.html#method___construct","name":"EasyRdf\\Literal\\Date::__construct","doc":"Constructor for creating a new date literal"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Date","fromLink":"EasyRdf/Literal/Date.html","link":"EasyRdf/Literal/Date.html#method_parse","name":"EasyRdf\\Literal\\Date::parse","doc":"Parses a string using DateTime and creates a new literal"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Date","fromLink":"EasyRdf/Literal/Date.html","link":"EasyRdf/Literal/Date.html#method_getValue","name":"EasyRdf\\Literal\\Date::getValue","doc":"Returns the date as a PHP DateTime object"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Date","fromLink":"EasyRdf/Literal/Date.html","link":"EasyRdf/Literal/Date.html#method_format","name":"EasyRdf\\Literal\\Date::format","doc":"Returns date formatted according to given format"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Date","fromLink":"EasyRdf/Literal/Date.html","link":"EasyRdf/Literal/Date.html#method_year","name":"EasyRdf\\Literal\\Date::year","doc":"A full integer representation of the year, 4 digits"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Date","fromLink":"EasyRdf/Literal/Date.html","link":"EasyRdf/Literal/Date.html#method_month","name":"EasyRdf\\Literal\\Date::month","doc":"Integer representation of the month"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Date","fromLink":"EasyRdf/Literal/Date.html","link":"EasyRdf/Literal/Date.html#method_day","name":"EasyRdf\\Literal\\Date::day","doc":"Integer representation of the day of the month"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal/DateTime.html","name":"EasyRdf\\Literal\\DateTime","doc":"Class that represents an RDF Literal of datatype xsd:dateTime"},
                                {"type":"Method","fromName":"EasyRdf\\Literal\\DateTime","fromLink":"EasyRdf/Literal/DateTime.html","link":"EasyRdf/Literal/DateTime.html#method___construct","name":"EasyRdf\\Literal\\DateTime::__construct","doc":"Constructor for creating a new date and time literal"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\DateTime","fromLink":"EasyRdf/Literal/DateTime.html","link":"EasyRdf/Literal/DateTime.html#method_parse","name":"EasyRdf\\Literal\\DateTime::parse","doc":"Parses a string using DateTime and creates a new literal"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\DateTime","fromLink":"EasyRdf/Literal/DateTime.html","link":"EasyRdf/Literal/DateTime.html#method_hour","name":"EasyRdf\\Literal\\DateTime::hour","doc":"24-hour format of the hour as an integer"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\DateTime","fromLink":"EasyRdf/Literal/DateTime.html","link":"EasyRdf/Literal/DateTime.html#method_min","name":"EasyRdf\\Literal\\DateTime::min","doc":"The minutes pasts the hour as an integer"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\DateTime","fromLink":"EasyRdf/Literal/DateTime.html","link":"EasyRdf/Literal/DateTime.html#method_sec","name":"EasyRdf\\Literal\\DateTime::sec","doc":"The seconds pasts the minute as an integer"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal/Decimal.html","name":"EasyRdf\\Literal\\Decimal","doc":"Class that represents an RDF Literal of datatype xsd:decimal"},
                                {"type":"Method","fromName":"EasyRdf\\Literal\\Decimal","fromLink":"EasyRdf/Literal/Decimal.html","link":"EasyRdf/Literal/Decimal.html#method___construct","name":"EasyRdf\\Literal\\Decimal::__construct","doc":"Constructor for creating a new decimal literal"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Decimal","fromLink":"EasyRdf/Literal/Decimal.html","link":"EasyRdf/Literal/Decimal.html#method_getValue","name":"EasyRdf\\Literal\\Decimal::getValue","doc":"Return the value of the literal cast to a PHP string"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Decimal","fromLink":"EasyRdf/Literal/Decimal.html","link":"EasyRdf/Literal/Decimal.html#method_validate","name":"EasyRdf\\Literal\\Decimal::validate","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Decimal","fromLink":"EasyRdf/Literal/Decimal.html","link":"EasyRdf/Literal/Decimal.html#method_canonicalise","name":"EasyRdf\\Literal\\Decimal::canonicalise","doc":"Converts valid xsd:decimal literal to Canonical representation\nsee http://www.w3.org/TR/xmlschema-2/#decimal"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal/HTML.html","name":"EasyRdf\\Literal\\HTML","doc":"Class that represents an RDF Literal of datatype rdf:HTML"},
                                {"type":"Method","fromName":"EasyRdf\\Literal\\HTML","fromLink":"EasyRdf/Literal/HTML.html","link":"EasyRdf/Literal/HTML.html#method___construct","name":"EasyRdf\\Literal\\HTML::__construct","doc":"Constructor for creating a new rdf:HTML literal"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\HTML","fromLink":"EasyRdf/Literal/HTML.html","link":"EasyRdf/Literal/HTML.html#method_stripTags","name":"EasyRdf\\Literal\\HTML::stripTags","doc":"Strip the HTML tags from the literal"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal/HexBinary.html","name":"EasyRdf\\Literal\\HexBinary","doc":"Class that represents an RDF Literal of datatype xsd:hexBinary"},
                                {"type":"Method","fromName":"EasyRdf\\Literal\\HexBinary","fromLink":"EasyRdf/Literal/HexBinary.html","link":"EasyRdf/Literal/HexBinary.html#method___construct","name":"EasyRdf\\Literal\\HexBinary::__construct","doc":"Constructor for creating a new xsd:hexBinary literal"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\HexBinary","fromLink":"EasyRdf/Literal/HexBinary.html","link":"EasyRdf/Literal/HexBinary.html#method_fromBinary","name":"EasyRdf\\Literal\\HexBinary::fromBinary","doc":"Constructor for creating a new literal object from a binary blob"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\HexBinary","fromLink":"EasyRdf/Literal/HexBinary.html","link":"EasyRdf/Literal/HexBinary.html#method_toBinary","name":"EasyRdf\\Literal\\HexBinary::toBinary","doc":"Decode the hexadecimal string into a binary blob"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal/Integer.html","name":"EasyRdf\\Literal\\Integer","doc":"Class that represents an RDF Literal of datatype xsd:integer"},
                                {"type":"Method","fromName":"EasyRdf\\Literal\\Integer","fromLink":"EasyRdf/Literal/Integer.html","link":"EasyRdf/Literal/Integer.html#method___construct","name":"EasyRdf\\Literal\\Integer::__construct","doc":"Constructor for creating a new integer literal"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\Integer","fromLink":"EasyRdf/Literal/Integer.html","link":"EasyRdf/Literal/Integer.html#method_getValue","name":"EasyRdf\\Literal\\Integer::getValue","doc":"Return the value of the literal cast to a PHP int"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Literal","fromLink":"EasyRdf/Literal.html","link":"EasyRdf/Literal/XML.html","name":"EasyRdf\\Literal\\XML","doc":"Class that represents an RDF Literal of datatype rdf:XMLLiteral"},
                                {"type":"Method","fromName":"EasyRdf\\Literal\\XML","fromLink":"EasyRdf/Literal/XML.html","link":"EasyRdf/Literal/XML.html#method___construct","name":"EasyRdf\\Literal\\XML::__construct","doc":"Constructor for creating a new rdf:XMLLiteral literal"},
        {"type":"Method","fromName":"EasyRdf\\Literal\\XML","fromLink":"EasyRdf/Literal/XML.html","link":"EasyRdf/Literal/XML.html#method_domParse","name":"EasyRdf\\Literal\\XML::domParse","doc":"Parse the XML literal into a DOMDocument"},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/ParsedUri.html","name":"EasyRdf\\ParsedUri","doc":"A RFC3986 compliant URI parser"},
                                {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method___construct","name":"EasyRdf\\ParsedUri::__construct","doc":"Constructor for creating a new parsed URI"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_isAbsolute","name":"EasyRdf\\ParsedUri::isAbsolute","doc":"Returns true if this is an absolute (complete) URI"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_isRelative","name":"EasyRdf\\ParsedUri::isRelative","doc":"Returns true if this is an relative (partial) URI"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_getScheme","name":"EasyRdf\\ParsedUri::getScheme","doc":"Returns the scheme of the URI (e.g. http)"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_setScheme","name":"EasyRdf\\ParsedUri::setScheme","doc":"Sets the scheme of the URI (e.g. http)"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_getAuthority","name":"EasyRdf\\ParsedUri::getAuthority","doc":"Returns the authority of the URI (e.g. www.example.com:8080)"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_setAuthority","name":"EasyRdf\\ParsedUri::setAuthority","doc":"Sets the authority of the URI (e.g. www.example.com:8080)"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_getPath","name":"EasyRdf\\ParsedUri::getPath","doc":"Returns the path of the URI (e.g. /foo/bar)"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_setPath","name":"EasyRdf\\ParsedUri::setPath","doc":"Set the path of the URI (e.g. /foo/bar)"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_getQuery","name":"EasyRdf\\ParsedUri::getQuery","doc":"Returns the query string part of the URI (e.g. foo=bar)"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_setQuery","name":"EasyRdf\\ParsedUri::setQuery","doc":"Set the query string of the URI (e.g. foo=bar)"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_getFragment","name":"EasyRdf\\ParsedUri::getFragment","doc":"Returns the fragment part of the URI (i.e. after the #)"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_setFragment","name":"EasyRdf\\ParsedUri::setFragment","doc":"Set the fragment of the URI (i.e. after the #)"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_normalise","name":"EasyRdf\\ParsedUri::normalise","doc":"Normalises the path of this URI if it has one."},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_resolve","name":"EasyRdf\\ParsedUri::resolve","doc":"Resolves a relative URI using this URI as the base URI."},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method_toString","name":"EasyRdf\\ParsedUri::toString","doc":"Convert the parsed URI back into a string"},
        {"type":"Method","fromName":"EasyRdf\\ParsedUri","fromLink":"EasyRdf/ParsedUri.html","link":"EasyRdf/ParsedUri.html#method___toString","name":"EasyRdf\\ParsedUri::__toString","doc":"Magic method to convert the URI, when casted, back to a string"},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/Parser.html","name":"EasyRdf\\Parser","doc":"Parent class for the EasyRdf parsers"},
                                {"type":"Method","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser.html#method_remapBnode","name":"EasyRdf\\Parser::remapBnode","doc":"Create a new, unique bnode identifier from a source identifier."},
        {"type":"Method","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser.html#method_resetBnodeMap","name":"EasyRdf\\Parser::resetBnodeMap","doc":"Delete the bnode mapping - to be called at the start of a new parse"},
        {"type":"Method","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser.html#method_checkParseParams","name":"EasyRdf\\Parser::checkParseParams","doc":"Check, cleanup parameters and prepare for parsing"},
        {"type":"Method","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser.html#method_parse","name":"EasyRdf\\Parser::parse","doc":"Sub-classes must follow this protocol"},
        {"type":"Method","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser.html#method_addTriple","name":"EasyRdf\\Parser::addTriple","doc":"Add a triple to the current graph, and keep count of the number of triples"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser/Arc.html","name":"EasyRdf\\Parser\\Arc","doc":"Class to parse RDF using the ARC2 library."},
                                {"type":"Method","fromName":"EasyRdf\\Parser\\Arc","fromLink":"EasyRdf/Parser/Arc.html","link":"EasyRdf/Parser/Arc.html#method___construct","name":"EasyRdf\\Parser\\Arc::__construct","doc":"Constructor"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Arc","fromLink":"EasyRdf/Parser/Arc.html","link":"EasyRdf/Parser/Arc.html#method_parse","name":"EasyRdf\\Parser\\Arc::parse","doc":"Parse an RDF document into an EasyRdf\\Graph"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser/Exception.html","name":"EasyRdf\\Parser\\Exception","doc":"EasyRdf Exception class"},
                                {"type":"Method","fromName":"EasyRdf\\Parser\\Exception","fromLink":"EasyRdf/Parser/Exception.html","link":"EasyRdf/Parser/Exception.html#method___construct","name":"EasyRdf\\Parser\\Exception::__construct","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Exception","fromLink":"EasyRdf/Parser/Exception.html","link":"EasyRdf/Parser/Exception.html#method_getParserLine","name":"EasyRdf\\Parser\\Exception::getParserLine","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Exception","fromLink":"EasyRdf/Parser/Exception.html","link":"EasyRdf/Parser/Exception.html#method_getParserColumn","name":"EasyRdf\\Parser\\Exception::getParserColumn","doc":null},
            
                                                {"type":"Class","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser/Json.html","name":"EasyRdf\\Parser\\Json","doc":"A pure-php class to parse RDF/JSON with no dependencies."},
                                {"type":"Method","fromName":"EasyRdf\\Parser\\Json","fromLink":"EasyRdf/Parser/Json.html","link":"EasyRdf/Parser/Json.html#method___construct","name":"EasyRdf\\Parser\\Json::__construct","doc":"Constructor"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Json","fromLink":"EasyRdf/Parser/Json.html","link":"EasyRdf/Parser/Json.html#method_jsonLastErrorString","name":"EasyRdf\\Parser\\Json::jsonLastErrorString","doc":"Return the last JSON parser error as a string"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Json","fromLink":"EasyRdf/Parser/Json.html","link":"EasyRdf/Parser/Json.html#method_parseJsonTriples","name":"EasyRdf\\Parser\\Json::parseJsonTriples","doc":"Parse the triple-centric JSON format, as output by libraptor"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Json","fromLink":"EasyRdf/Parser/Json.html","link":"EasyRdf/Parser/Json.html#method_parse","name":"EasyRdf\\Parser\\Json::parse","doc":"Parse RDF/JSON into an EasyRdf\\Graph"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser/JsonLd.html","name":"EasyRdf\\Parser\\JsonLd","doc":"Class to parse JSON-LD to an EasyRdf\\Graph"},
                                {"type":"Method","fromName":"EasyRdf\\Parser\\JsonLd","fromLink":"EasyRdf/Parser/JsonLd.html","link":"EasyRdf/Parser/JsonLd.html#method_parse","name":"EasyRdf\\Parser\\JsonLd::parse","doc":"Parse a JSON-LD document into an EasyRdf\\Graph"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser/Ntriples.html","name":"EasyRdf\\Parser\\Ntriples","doc":"A pure-php class to parse N-Triples with no dependencies."},
                                {"type":"Method","fromName":"EasyRdf\\Parser\\Ntriples","fromLink":"EasyRdf/Parser/Ntriples.html","link":"EasyRdf/Parser/Ntriples.html#method_unescapeString","name":"EasyRdf\\Parser\\Ntriples::unescapeString","doc":"Decodes an encoded N-Triples string. Any &#45;escape sequences are substituted\nwith their decoded value."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Ntriples","fromLink":"EasyRdf/Parser/Ntriples.html","link":"EasyRdf/Parser/Ntriples.html#method_parseNtriplesSubject","name":"EasyRdf\\Parser\\Ntriples::parseNtriplesSubject","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Ntriples","fromLink":"EasyRdf/Parser/Ntriples.html","link":"EasyRdf/Parser/Ntriples.html#method_parseNtriplesObject","name":"EasyRdf\\Parser\\Ntriples::parseNtriplesObject","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Ntriples","fromLink":"EasyRdf/Parser/Ntriples.html","link":"EasyRdf/Parser/Ntriples.html#method_parse","name":"EasyRdf\\Parser\\Ntriples::parse","doc":"Parse an N-Triples document into an EasyRdf\\Graph"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser/Rapper.html","name":"EasyRdf\\Parser\\Rapper","doc":"Class to parse RDF using the 'rapper' command line tool."},
                                {"type":"Method","fromName":"EasyRdf\\Parser\\Rapper","fromLink":"EasyRdf/Parser/Rapper.html","link":"EasyRdf/Parser/Rapper.html#method___construct","name":"EasyRdf\\Parser\\Rapper::__construct","doc":"Constructor"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rapper","fromLink":"EasyRdf/Parser/Rapper.html","link":"EasyRdf/Parser/Rapper.html#method_parse","name":"EasyRdf\\Parser\\Rapper::parse","doc":"Parse an RDF document into an EasyRdf\\Graph"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser/RdfPhp.html","name":"EasyRdf\\Parser\\RdfPhp","doc":"Class to parse RDF with no external dependencies."},
                                {"type":"Method","fromName":"EasyRdf\\Parser\\RdfPhp","fromLink":"EasyRdf/Parser/RdfPhp.html","link":"EasyRdf/Parser/RdfPhp.html#method___construct","name":"EasyRdf\\Parser\\RdfPhp::__construct","doc":"Constructor"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfPhp","fromLink":"EasyRdf/Parser/RdfPhp.html","link":"EasyRdf/Parser/RdfPhp.html#method_parse","name":"EasyRdf\\Parser\\RdfPhp::parse","doc":"Parse RDF/PHP into an EasyRdf\\Graph"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser/RdfXml.html","name":"EasyRdf\\Parser\\RdfXml","doc":"A pure-php class to parse RDF/XML."},
                                {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method___construct","name":"EasyRdf\\Parser\\RdfXml::__construct","doc":"Constructor"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_init","name":"EasyRdf\\Parser\\RdfXml::init","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_initXMLParser","name":"EasyRdf\\Parser\\RdfXml::initXMLParser","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_pushS","name":"EasyRdf\\Parser\\RdfXml::pushS","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_popS","name":"EasyRdf\\Parser\\RdfXml::popS","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_updateS","name":"EasyRdf\\Parser\\RdfXml::updateS","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_getParentS","name":"EasyRdf\\Parser\\RdfXml::getParentS","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_getParentXBase","name":"EasyRdf\\Parser\\RdfXml::getParentXBase","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_getParentXLang","name":"EasyRdf\\Parser\\RdfXml::getParentXLang","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_splitURI","name":"EasyRdf\\Parser\\RdfXml::splitURI","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_add","name":"EasyRdf\\Parser\\RdfXml::add","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_reify","name":"EasyRdf\\Parser\\RdfXml::reify","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_startElementHandler","name":"EasyRdf\\Parser\\RdfXml::startElementHandler","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_endElementHandler","name":"EasyRdf\\Parser\\RdfXml::endElementHandler","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_cdataHandler","name":"EasyRdf\\Parser\\RdfXml::cdataHandler","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_newNamespaceHandler","name":"EasyRdf\\Parser\\RdfXml::newNamespaceHandler","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_startState0","name":"EasyRdf\\Parser\\RdfXml::startState0","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_startState1","name":"EasyRdf\\Parser\\RdfXml::startState1","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_startState2","name":"EasyRdf\\Parser\\RdfXml::startState2","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_startState4","name":"EasyRdf\\Parser\\RdfXml::startState4","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_startState5","name":"EasyRdf\\Parser\\RdfXml::startState5","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_startState6","name":"EasyRdf\\Parser\\RdfXml::startState6","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_endState1","name":"EasyRdf\\Parser\\RdfXml::endState1","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_endState2","name":"EasyRdf\\Parser\\RdfXml::endState2","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_endState3","name":"EasyRdf\\Parser\\RdfXml::endState3","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_endState4","name":"EasyRdf\\Parser\\RdfXml::endState4","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_endState5","name":"EasyRdf\\Parser\\RdfXml::endState5","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_endState6","name":"EasyRdf\\Parser\\RdfXml::endState6","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_cdataState4","name":"EasyRdf\\Parser\\RdfXml::cdataState4","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_cdataState6","name":"EasyRdf\\Parser\\RdfXml::cdataState6","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\RdfXml","fromLink":"EasyRdf/Parser/RdfXml.html","link":"EasyRdf/Parser/RdfXml.html#method_parse","name":"EasyRdf\\Parser\\RdfXml::parse","doc":"Parse an RDF/XML document into an EasyRdf\\Graph"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser/Rdfa.html","name":"EasyRdf\\Parser\\Rdfa","doc":"Class to parse RDFa 1.1 with no external dependencies."},
                                {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method___construct","name":"EasyRdf\\Parser\\Rdfa::__construct","doc":"Constructor"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method_addTriple","name":"EasyRdf\\Parser\\Rdfa::addTriple","doc":"Add a triple to the current graph, and keep count of the number of triples"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method_generateList","name":"EasyRdf\\Parser\\Rdfa::generateList","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method_addToList","name":"EasyRdf\\Parser\\Rdfa::addToList","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method_printNode","name":"EasyRdf\\Parser\\Rdfa::printNode","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method_guessTimeDatatype","name":"EasyRdf\\Parser\\Rdfa::guessTimeDatatype","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method_initialContext","name":"EasyRdf\\Parser\\Rdfa::initialContext","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method_expandCurie","name":"EasyRdf\\Parser\\Rdfa::expandCurie","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method_processUri","name":"EasyRdf\\Parser\\Rdfa::processUri","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method_processUriList","name":"EasyRdf\\Parser\\Rdfa::processUriList","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method_getUriAttribute","name":"EasyRdf\\Parser\\Rdfa::getUriAttribute","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method_processNode","name":"EasyRdf\\Parser\\Rdfa::processNode","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Rdfa","fromLink":"EasyRdf/Parser/Rdfa.html","link":"EasyRdf/Parser/Rdfa.html#method_parse","name":"EasyRdf\\Parser\\Rdfa::parse","doc":"Parse RDFa 1.1 into an EasyRdf\\Graph"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Parser","fromLink":"EasyRdf/Parser.html","link":"EasyRdf/Parser/Turtle.html","name":"EasyRdf\\Parser\\Turtle","doc":"Class to parse Turtle with no external dependencies."},
                                {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method___construct","name":"EasyRdf\\Parser\\Turtle::__construct","doc":"Constructor"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parse","name":"EasyRdf\\Parser\\Turtle::parse","doc":"Parse Turtle into an Graph"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseStatement","name":"EasyRdf\\Parser\\Turtle::parseStatement","doc":"Parse a statement [2]"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseDirective","name":"EasyRdf\\Parser\\Turtle::parseDirective","doc":"Parse a directive [3]"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parsePrefixID","name":"EasyRdf\\Parser\\Turtle::parsePrefixID","doc":"Parse a prefixID [4]"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseBase","name":"EasyRdf\\Parser\\Turtle::parseBase","doc":"Parse base [5]"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseTriples","name":"EasyRdf\\Parser\\Turtle::parseTriples","doc":"Parse triples [6] modified to use a pointer instead of\nmanipulating the input buffer directly."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parsePredicateObjectList","name":"EasyRdf\\Parser\\Turtle::parsePredicateObjectList","doc":"Parse a predicateObjectList [7]"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseObjectList","name":"EasyRdf\\Parser\\Turtle::parseObjectList","doc":"Parse a objectList [8]"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseSubject","name":"EasyRdf\\Parser\\Turtle::parseSubject","doc":"Parse a subject [10]"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parsePredicate","name":"EasyRdf\\Parser\\Turtle::parsePredicate","doc":"Parse a predicate [11]"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseObject","name":"EasyRdf\\Parser\\Turtle::parseObject","doc":"Parse a object [12]"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseImplicitBlank","name":"EasyRdf\\Parser\\Turtle::parseImplicitBlank","doc":"Parses a blankNodePropertyList [15]"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseCollection","name":"EasyRdf\\Parser\\Turtle::parseCollection","doc":"Parses a collection [16], e.g: ( item1 item2 item3 )"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseValue","name":"EasyRdf\\Parser\\Turtle::parseValue","doc":"Parses an RDF value. This method parses uriref, qname, node ID, quoted\nliteral, integer, double and boolean."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseQuotedLiteral","name":"EasyRdf\\Parser\\Turtle::parseQuotedLiteral","doc":"Parses a quoted string, optionally followed by a language tag or datatype."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseQuotedString","name":"EasyRdf\\Parser\\Turtle::parseQuotedString","doc":"Parses a quoted string, which is either a \"normal string\" or a \"\"\"long string\"\"\"."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseString","name":"EasyRdf\\Parser\\Turtle::parseString","doc":"Parses a \"normal string\". This method requires that the opening character\nhas already been parsed."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseLongString","name":"EasyRdf\\Parser\\Turtle::parseLongString","doc":"Parses a \"\"\"long string\"\"\". This method requires that the first three\ncharacters have already been parsed."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseNumber","name":"EasyRdf\\Parser\\Turtle::parseNumber","doc":"Parses a numeric value, either of type integer, decimal or double"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseURI","name":"EasyRdf\\Parser\\Turtle::parseURI","doc":"Parses a URI / IRI"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseQNameOrBoolean","name":"EasyRdf\\Parser\\Turtle::parseQNameOrBoolean","doc":"Parses qnames and boolean values, which have equivalent starting\ncharacters."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_readLocalEscapedChar","name":"EasyRdf\\Parser\\Turtle::readLocalEscapedChar","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_parseNodeID","name":"EasyRdf\\Parser\\Turtle::parseNodeID","doc":"Parses a blank node ID, e.g: _:node1"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_resolve","name":"EasyRdf\\Parser\\Turtle::resolve","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_verifyCharacterOrFail","name":"EasyRdf\\Parser\\Turtle::verifyCharacterOrFail","doc":"Verifies that the supplied character $c is one of the expected\ncharacters specified in $expected. This method will throw a\nexception if this is not the case."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_skipWSC","name":"EasyRdf\\Parser\\Turtle::skipWSC","doc":"Skip through whitespace and comments"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_processComment","name":"EasyRdf\\Parser\\Turtle::processComment","doc":"Consumes characters from reader until the first EOL has been read."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_read","name":"EasyRdf\\Parser\\Turtle::read","doc":"Read a single character from the input buffer."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_peek","name":"EasyRdf\\Parser\\Turtle::peek","doc":"Gets the next character to be returned by read()\nwithout moving the pointer position. Speeds up the\nmb_substr() call by only giving it the next 4 bytes to parse."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_unread","name":"EasyRdf\\Parser\\Turtle::unread","doc":"Steps back, restoring the previous character read() to the input buffer"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_unskipWS","name":"EasyRdf\\Parser\\Turtle::unskipWS","doc":"Reverse skips through whitespace in 4 byte increments."},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_createBNode","name":"EasyRdf\\Parser\\Turtle::createBNode","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_isWhitespace","name":"EasyRdf\\Parser\\Turtle::isWhitespace","doc":"Returns true if $c is a whitespace character"},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_isPrefixStartChar","name":"EasyRdf\\Parser\\Turtle::isPrefixStartChar","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_isNameStartChar","name":"EasyRdf\\Parser\\Turtle::isNameStartChar","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_isNameChar","name":"EasyRdf\\Parser\\Turtle::isNameChar","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_isLocalEscapedChar","name":"EasyRdf\\Parser\\Turtle::isLocalEscapedChar","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_isPrefixChar","name":"EasyRdf\\Parser\\Turtle::isPrefixChar","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_isLanguageStartChar","name":"EasyRdf\\Parser\\Turtle::isLanguageStartChar","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Parser\\Turtle","fromLink":"EasyRdf/Parser/Turtle.html","link":"EasyRdf/Parser/Turtle.html#method_isLanguageChar","name":"EasyRdf\\Parser\\Turtle::isLanguageChar","doc":""},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/RdfNamespace.html","name":"EasyRdf\\RdfNamespace","doc":"A namespace registry and manipulation class."},
                                {"type":"Method","fromName":"EasyRdf\\RdfNamespace","fromLink":"EasyRdf/RdfNamespace.html","link":"EasyRdf/RdfNamespace.html#method_namespaces","name":"EasyRdf\\RdfNamespace::namespaces","doc":"Return all the namespaces registered"},
        {"type":"Method","fromName":"EasyRdf\\RdfNamespace","fromLink":"EasyRdf/RdfNamespace.html","link":"EasyRdf/RdfNamespace.html#method_resetNamespaces","name":"EasyRdf\\RdfNamespace::resetNamespaces","doc":"Resets list of namespaces to the one, which is provided by EasyRDF\nuseful for tests, among other things"},
        {"type":"Method","fromName":"EasyRdf\\RdfNamespace","fromLink":"EasyRdf/RdfNamespace.html","link":"EasyRdf/RdfNamespace.html#method_get","name":"EasyRdf\\RdfNamespace::get","doc":"Return a namespace given its prefix."},
        {"type":"Method","fromName":"EasyRdf\\RdfNamespace","fromLink":"EasyRdf/RdfNamespace.html","link":"EasyRdf/RdfNamespace.html#method_set","name":"EasyRdf\\RdfNamespace::set","doc":"Register a new namespace."},
        {"type":"Method","fromName":"EasyRdf\\RdfNamespace","fromLink":"EasyRdf/RdfNamespace.html","link":"EasyRdf/RdfNamespace.html#method_getDefault","name":"EasyRdf\\RdfNamespace::getDefault","doc":"Get the default namespace"},
        {"type":"Method","fromName":"EasyRdf\\RdfNamespace","fromLink":"EasyRdf/RdfNamespace.html","link":"EasyRdf/RdfNamespace.html#method_setDefault","name":"EasyRdf\\RdfNamespace::setDefault","doc":"Set the default namespace"},
        {"type":"Method","fromName":"EasyRdf\\RdfNamespace","fromLink":"EasyRdf/RdfNamespace.html","link":"EasyRdf/RdfNamespace.html#method_delete","name":"EasyRdf\\RdfNamespace::delete","doc":"Delete an existing namespace."},
        {"type":"Method","fromName":"EasyRdf\\RdfNamespace","fromLink":"EasyRdf/RdfNamespace.html","link":"EasyRdf/RdfNamespace.html#method_reset","name":"EasyRdf\\RdfNamespace::reset","doc":"Delete the anonymous namespaces and reset the counter to 0"},
        {"type":"Method","fromName":"EasyRdf\\RdfNamespace","fromLink":"EasyRdf/RdfNamespace.html","link":"EasyRdf/RdfNamespace.html#method_splitUri","name":"EasyRdf\\RdfNamespace::splitUri","doc":"Try and breakup a URI into a prefix and local part"},
        {"type":"Method","fromName":"EasyRdf\\RdfNamespace","fromLink":"EasyRdf/RdfNamespace.html","link":"EasyRdf/RdfNamespace.html#method_prefixOfUri","name":"EasyRdf\\RdfNamespace::prefixOfUri","doc":"Return the prefix namespace that a URI belongs to."},
        {"type":"Method","fromName":"EasyRdf\\RdfNamespace","fromLink":"EasyRdf/RdfNamespace.html","link":"EasyRdf/RdfNamespace.html#method_shorten","name":"EasyRdf\\RdfNamespace::shorten","doc":"Shorten a URI by substituting in the namespace prefix."},
        {"type":"Method","fromName":"EasyRdf\\RdfNamespace","fromLink":"EasyRdf/RdfNamespace.html","link":"EasyRdf/RdfNamespace.html#method_expand","name":"EasyRdf\\RdfNamespace::expand","doc":"Expand a shortened URI (qname) back into a full URI."},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/Resource.html","name":"EasyRdf\\Resource","doc":"Class that represents an RDF resource"},
                                {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method___construct","name":"EasyRdf\\Resource::__construct","doc":"Constructor"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_getGraph","name":"EasyRdf\\Resource::getGraph","doc":"Return the graph that this resource belongs to"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_getUri","name":"EasyRdf\\Resource::getUri","doc":"Returns the URI for the resource."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_isBNode","name":"EasyRdf\\Resource::isBNode","doc":"Check to see if a resource is a blank node."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_getBNodeId","name":"EasyRdf\\Resource::getBNodeId","doc":"Get the identifier for a blank node"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_prefix","name":"EasyRdf\\Resource::prefix","doc":"Get a the prefix of the namespace that this resource is part of"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_shorten","name":"EasyRdf\\Resource::shorten","doc":"Get a shortened version of the resources URI."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_localName","name":"EasyRdf\\Resource::localName","doc":"Gets the local name of the URI of this resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_parseUri","name":"EasyRdf\\Resource::parseUri","doc":"Parse the URI of the resource and return as a ParsedUri object"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_htmlLink","name":"EasyRdf\\Resource::htmlLink","doc":"Generates an HTML anchor tag, linking to this resource."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_toRdfPhp","name":"EasyRdf\\Resource::toRdfPhp","doc":"Returns the properties of the resource as an RDF/PHP associative array"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_dumpValue","name":"EasyRdf\\Resource::dumpValue","doc":"Return pretty-print view of the resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method___toString","name":"EasyRdf\\Resource::__toString","doc":"Magic method to return URI of resource when casted to string"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_checkHasGraph","name":"EasyRdf\\Resource::checkHasGraph","doc":"Throw can exception if the resource does not belong to a graph"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_load","name":"EasyRdf\\Resource::load","doc":"Perform a load (download of remote URI) of the resource into the graph"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_delete","name":"EasyRdf\\Resource::delete","doc":"Delete a property (or optionally just a specific value)"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_add","name":"EasyRdf\\Resource::add","doc":"Add values to for a property of the resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_addLiteral","name":"EasyRdf\\Resource::addLiteral","doc":"Add a literal value as a property of the resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_addResource","name":"EasyRdf\\Resource::addResource","doc":"Add a resource as a property of the resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_set","name":"EasyRdf\\Resource::set","doc":"Set value for a property"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_get","name":"EasyRdf\\Resource::get","doc":"Get a single value for a property"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_getLiteral","name":"EasyRdf\\Resource::getLiteral","doc":"Get a single literal value for a property of the resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_getResource","name":"EasyRdf\\Resource::getResource","doc":"Get a single resource value for a property of the resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_all","name":"EasyRdf\\Resource::all","doc":"Get all values for a property"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_allLiterals","name":"EasyRdf\\Resource::allLiterals","doc":"Get all literal values for a property of the resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_allResources","name":"EasyRdf\\Resource::allResources","doc":"Get all resources for a property of the resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_countValues","name":"EasyRdf\\Resource::countValues","doc":"Count the number of values for a property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_join","name":"EasyRdf\\Resource::join","doc":"Concatenate all values for a property into a string."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_propertyUris","name":"EasyRdf\\Resource::propertyUris","doc":"Get a list of the full URIs for the properties of this resource."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_properties","name":"EasyRdf\\Resource::properties","doc":"Get a list of all the shortened property names (qnames) for a resource."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_reversePropertyUris","name":"EasyRdf\\Resource::reversePropertyUris","doc":"Get a list of the full URIs for the properties that point to this resource."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_hasProperty","name":"EasyRdf\\Resource::hasProperty","doc":"Check to see if a property exists for this resource."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_types","name":"EasyRdf\\Resource::types","doc":"Get a list of types for a resource."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_type","name":"EasyRdf\\Resource::type","doc":"Get a single type for a resource."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_typeAsResource","name":"EasyRdf\\Resource::typeAsResource","doc":"Get a single type for a resource, as a resource."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_typesAsResources","name":"EasyRdf\\Resource::typesAsResources","doc":"Get a list of types for a resource, as EasyRdf\\Resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_isA","name":"EasyRdf\\Resource::isA","doc":"Check if a resource is of the specified type"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_addType","name":"EasyRdf\\Resource::addType","doc":"Add one or more rdf:type properties to the resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_setType","name":"EasyRdf\\Resource::setType","doc":"Change the rdf:type property for the resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_primaryTopic","name":"EasyRdf\\Resource::primaryTopic","doc":"Get the primary topic of this resource."},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_label","name":"EasyRdf\\Resource::label","doc":"Get a human readable label for this resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_dump","name":"EasyRdf\\Resource::dump","doc":"Return a human readable view of the resource and its properties"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method___get","name":"EasyRdf\\Resource::__get","doc":"Magic method to get a property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method___set","name":"EasyRdf\\Resource::__set","doc":"Magic method to set the value for a property of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method___isset","name":"EasyRdf\\Resource::__isset","doc":"Magic method to check if a property exists"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method___unset","name":"EasyRdf\\Resource::__unset","doc":"Magic method to delete a property of the resource"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_offsetExists","name":"EasyRdf\\Resource::offsetExists","doc":"Whether a offset exists"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_offsetGet","name":"EasyRdf\\Resource::offsetGet","doc":"Offset to retrieve"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_offsetSet","name":"EasyRdf\\Resource::offsetSet","doc":"Offset to set"},
        {"type":"Method","fromName":"EasyRdf\\Resource","fromLink":"EasyRdf/Resource.html","link":"EasyRdf/Resource.html#method_offsetUnset","name":"EasyRdf\\Resource::offsetUnset","doc":"Offset to unset"},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/Serialiser.html","name":"EasyRdf\\Serialiser","doc":"Parent class for the EasyRdf serialiser"},
                                {"type":"Method","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser.html#method_addPrefix","name":"EasyRdf\\Serialiser::addPrefix","doc":"Keep track of the prefixes used while serialising"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser.html#method_checkSerialiseParams","name":"EasyRdf\\Serialiser::checkSerialiseParams","doc":"Check and cleanup parameters passed to serialise() method"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser.html#method_reversePropertyCount","name":"EasyRdf\\Serialiser::reversePropertyCount","doc":"Protected method to get the number of reverse properties for a resource\nIf a resource only has a single property, the number of values for that\nproperty is returned instead."},
        {"type":"Method","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser.html#method_serialise","name":"EasyRdf\\Serialiser::serialise","doc":"Serialise an EasyRdf\\Graph into desired format."},
            
                                                {"type":"Class","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser/Arc.html","name":"EasyRdf\\Serialiser\\Arc","doc":"Class to serialise RDF using the ARC2 library."},
                                {"type":"Method","fromName":"EasyRdf\\Serialiser\\Arc","fromLink":"EasyRdf/Serialiser/Arc.html","link":"EasyRdf/Serialiser/Arc.html#method___construct","name":"EasyRdf\\Serialiser\\Arc::__construct","doc":"Constructor"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Arc","fromLink":"EasyRdf/Serialiser/Arc.html","link":"EasyRdf/Serialiser/Arc.html#method_serialise","name":"EasyRdf\\Serialiser\\Arc::serialise","doc":"Serialise an EasyRdf\\Graph into RDF format of choice."},
            
                                                {"type":"Class","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser/GraphViz.html","name":"EasyRdf\\Serialiser\\GraphViz","doc":"Class to serialise an EasyRdf\\Graph to GraphViz"},
                                {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_setDotCommand","name":"EasyRdf\\Serialiser\\GraphViz::setDotCommand","doc":"Set the path to the GraphViz 'dot' command"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_getDotCommand","name":"EasyRdf\\Serialiser\\GraphViz::getDotCommand","doc":"Get the path to the GraphViz 'dot' command"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_setUseLabels","name":"EasyRdf\\Serialiser\\GraphViz::setUseLabels","doc":"Turn on/off the option to display labels instead of URIs."},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_getUseLabels","name":"EasyRdf\\Serialiser\\GraphViz::getUseLabels","doc":"Get the state of the use labels option"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_setOnlyLabelled","name":"EasyRdf\\Serialiser\\GraphViz::setOnlyLabelled","doc":"Turn on/off the option to only display nodes and edges with labels"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_getOnlyLabelled","name":"EasyRdf\\Serialiser\\GraphViz::getOnlyLabelled","doc":"Get the state of the only Only Labelled option"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_setAttribute","name":"EasyRdf\\Serialiser\\GraphViz::setAttribute","doc":"Set an attribute on the GraphViz graph"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_getAttribute","name":"EasyRdf\\Serialiser\\GraphViz::getAttribute","doc":"Get an attribute of the GraphViz graph"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_nodeName","name":"EasyRdf\\Serialiser\\GraphViz::nodeName","doc":"Convert an EasyRdf object into a GraphViz node identifier"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_escape","name":"EasyRdf\\Serialiser\\GraphViz::escape","doc":"Internal function to escape a string into DOT safe syntax"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_escapeAttributes","name":"EasyRdf\\Serialiser\\GraphViz::escapeAttributes","doc":"Internal function to escape an associate array of attributes and\nturns it into a DOT notation string"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_serialiseRow","name":"EasyRdf\\Serialiser\\GraphViz::serialiseRow","doc":"Internal function to create dot syntax line for either a node or an edge"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_serialiseDot","name":"EasyRdf\\Serialiser\\GraphViz::serialiseDot","doc":"Internal function to serialise an EasyRdf\\Graph into a DOT formatted string"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_renderImage","name":"EasyRdf\\Serialiser\\GraphViz::renderImage","doc":"Internal function to render a graph into an image"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\GraphViz","fromLink":"EasyRdf/Serialiser/GraphViz.html","link":"EasyRdf/Serialiser/GraphViz.html#method_serialise","name":"EasyRdf\\Serialiser\\GraphViz::serialise","doc":"Serialise an EasyRdf\\Graph into a GraphViz dot document."},
            
                                                {"type":"Class","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser/Json.html","name":"EasyRdf\\Serialiser\\Json","doc":"Class to serialise an EasyRdf\\Graph to RDF/JSON\nwith no external dependencies."},
                                {"type":"Method","fromName":"EasyRdf\\Serialiser\\Json","fromLink":"EasyRdf/Serialiser/Json.html","link":"EasyRdf/Serialiser/Json.html#method_serialise","name":"EasyRdf\\Serialiser\\Json::serialise","doc":"Serialise an EasyRdf\\Graph into a to RDF/JSON document."},
            
                                                {"type":"Class","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser/JsonLd.html","name":"EasyRdf\\Serialiser\\JsonLd","doc":"Class to serialise an EasyRdf\\Graph to JSON-LD"},
                                {"type":"Method","fromName":"EasyRdf\\Serialiser\\JsonLd","fromLink":"EasyRdf/Serialiser/JsonLd.html","link":"EasyRdf/Serialiser/JsonLd.html#method___construct","name":"EasyRdf\\Serialiser\\JsonLd::__construct","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\JsonLd","fromLink":"EasyRdf/Serialiser/JsonLd.html","link":"EasyRdf/Serialiser/JsonLd.html#method_serialise","name":"EasyRdf\\Serialiser\\JsonLd::serialise","doc":"Serialise an EasyRdf\\Graph into a JSON-LD document."},
            
                                                {"type":"Class","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser/Ntriples.html","name":"EasyRdf\\Serialiser\\Ntriples","doc":"Class to serialise an EasyRdf\\Graph to N-Triples\nwith no external dependencies."},
                                {"type":"Method","fromName":"EasyRdf\\Serialiser\\Ntriples","fromLink":"EasyRdf/Serialiser/Ntriples.html","link":"EasyRdf/Serialiser/Ntriples.html#method_escapeString","name":"EasyRdf\\Serialiser\\Ntriples::escapeString","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Ntriples","fromLink":"EasyRdf/Serialiser/Ntriples.html","link":"EasyRdf/Serialiser/Ntriples.html#method_unicodeCharNo","name":"EasyRdf\\Serialiser\\Ntriples::unicodeCharNo","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Ntriples","fromLink":"EasyRdf/Serialiser/Ntriples.html","link":"EasyRdf/Serialiser/Ntriples.html#method_escapedChar","name":"EasyRdf\\Serialiser\\Ntriples::escapedChar","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Ntriples","fromLink":"EasyRdf/Serialiser/Ntriples.html","link":"EasyRdf/Serialiser/Ntriples.html#method_serialiseResource","name":"EasyRdf\\Serialiser\\Ntriples::serialiseResource","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Ntriples","fromLink":"EasyRdf/Serialiser/Ntriples.html","link":"EasyRdf/Serialiser/Ntriples.html#method_serialiseValue","name":"EasyRdf\\Serialiser\\Ntriples::serialiseValue","doc":"Serialise an RDF value into N-Triples"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Ntriples","fromLink":"EasyRdf/Serialiser/Ntriples.html","link":"EasyRdf/Serialiser/Ntriples.html#method_serialise","name":"EasyRdf\\Serialiser\\Ntriples::serialise","doc":"Serialise an EasyRdf\\Graph into N-Triples"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser/Rapper.html","name":"EasyRdf\\Serialiser\\Rapper","doc":"Class to serialise an EasyRdf\\Graph to RDF\nusing the 'rapper' command line tool."},
                                {"type":"Method","fromName":"EasyRdf\\Serialiser\\Rapper","fromLink":"EasyRdf/Serialiser/Rapper.html","link":"EasyRdf/Serialiser/Rapper.html#method___construct","name":"EasyRdf\\Serialiser\\Rapper::__construct","doc":"Constructor"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Rapper","fromLink":"EasyRdf/Serialiser/Rapper.html","link":"EasyRdf/Serialiser/Rapper.html#method_serialise","name":"EasyRdf\\Serialiser\\Rapper::serialise","doc":"Serialise an EasyRdf\\Graph to the RDF format of choice."},
            
                                                {"type":"Class","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser/RdfPhp.html","name":"EasyRdf\\Serialiser\\RdfPhp","doc":"Class to serialise an EasyRdf\\Graph to RDF/PHP\nwith no external dependencies."},
                                {"type":"Method","fromName":"EasyRdf\\Serialiser\\RdfPhp","fromLink":"EasyRdf/Serialiser/RdfPhp.html","link":"EasyRdf/Serialiser/RdfPhp.html#method_serialise","name":"EasyRdf\\Serialiser\\RdfPhp::serialise","doc":"Method to serialise an EasyRdf\\Graph to RDF/PHP"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser/RdfXml.html","name":"EasyRdf\\Serialiser\\RdfXml","doc":"Class to serialise an EasyRdf\\Graph to RDF/XML\nwith no external dependencies."},
                                {"type":"Method","fromName":"EasyRdf\\Serialiser\\RdfXml","fromLink":"EasyRdf/Serialiser/RdfXml.html","link":"EasyRdf/Serialiser/RdfXml.html#method_rdfxmlObject","name":"EasyRdf\\Serialiser\\RdfXml::rdfxmlObject","doc":"Protected method to serialise an object node into an XML object"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\RdfXml","fromLink":"EasyRdf/Serialiser/RdfXml.html","link":"EasyRdf/Serialiser/RdfXml.html#method_rdfxmlResource","name":"EasyRdf\\Serialiser\\RdfXml::rdfxmlResource","doc":"Protected method to serialise a whole resource and its properties"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\RdfXml","fromLink":"EasyRdf/Serialiser/RdfXml.html","link":"EasyRdf/Serialiser/RdfXml.html#method_serialise","name":"EasyRdf\\Serialiser\\RdfXml::serialise","doc":"Method to serialise an EasyRdf\\Graph to RDF/XML"},
            
                                                {"type":"Class","fromName":"EasyRdf\\Serialiser","fromLink":"EasyRdf/Serialiser.html","link":"EasyRdf/Serialiser/Turtle.html","name":"EasyRdf\\Serialiser\\Turtle","doc":"Class to serialise an EasyRdf\\Graph to Turtle\nwith no external dependencies."},
                                {"type":"Method","fromName":"EasyRdf\\Serialiser\\Turtle","fromLink":"EasyRdf/Serialiser/Turtle.html","link":"EasyRdf/Serialiser/Turtle.html#method_escapeIri","name":"EasyRdf\\Serialiser\\Turtle::escapeIri","doc":"Given a IRI string, escape and enclose in angle brackets."},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Turtle","fromLink":"EasyRdf/Serialiser/Turtle.html","link":"EasyRdf/Serialiser/Turtle.html#method_quotedString","name":"EasyRdf\\Serialiser\\Turtle::quotedString","doc":"Given a string, enclose in quotes and escape any quotes in the string."},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Turtle","fromLink":"EasyRdf/Serialiser/Turtle.html","link":"EasyRdf/Serialiser/Turtle.html#method_serialiseResource","name":"EasyRdf\\Serialiser\\Turtle::serialiseResource","doc":"Given a an EasyRdf\\Resource or URI, convert it into a string, suitable to\nbe written to a Turtle document. URIs will be shortened into CURIES\nwhere possible."},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Turtle","fromLink":"EasyRdf/Serialiser/Turtle.html","link":"EasyRdf/Serialiser/Turtle.html#method_serialiseLiteral","name":"EasyRdf\\Serialiser\\Turtle::serialiseLiteral","doc":"Given an EasyRdf\\Literal object, convert it into a string, suitable to\nbe written to a Turtle document. Supports multiline literals and literals with\ndatatypes or languages."},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Turtle","fromLink":"EasyRdf/Serialiser/Turtle.html","link":"EasyRdf/Serialiser/Turtle.html#method_serialiseObject","name":"EasyRdf\\Serialiser\\Turtle::serialiseObject","doc":"Convert an EasyRdf object into a string suitable to\nbe written to a Turtle document."},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Turtle","fromLink":"EasyRdf/Serialiser/Turtle.html","link":"EasyRdf/Serialiser/Turtle.html#method_serialiseCollection","name":"EasyRdf\\Serialiser\\Turtle::serialiseCollection","doc":"Protected method to serialise a RDF collection"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Turtle","fromLink":"EasyRdf/Serialiser/Turtle.html","link":"EasyRdf/Serialiser/Turtle.html#method_serialiseProperties","name":"EasyRdf\\Serialiser\\Turtle::serialiseProperties","doc":"Protected method to serialise the properties of a resource"},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Turtle","fromLink":"EasyRdf/Serialiser/Turtle.html","link":"EasyRdf/Serialiser/Turtle.html#method_serialisePrefixes","name":"EasyRdf\\Serialiser\\Turtle::serialisePrefixes","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Turtle","fromLink":"EasyRdf/Serialiser/Turtle.html","link":"EasyRdf/Serialiser/Turtle.html#method_serialiseSubjects","name":"EasyRdf\\Serialiser\\Turtle::serialiseSubjects","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Serialiser\\Turtle","fromLink":"EasyRdf/Serialiser/Turtle.html","link":"EasyRdf/Serialiser/Turtle.html#method_serialise","name":"EasyRdf\\Serialiser\\Turtle::serialise","doc":"Serialise an EasyRdf\\Graph to Turtle."},
            
                                                {"type":"Class","fromName":"EasyRdf\\Sparql","fromLink":"EasyRdf/Sparql.html","link":"EasyRdf/Sparql/Client.html","name":"EasyRdf\\Sparql\\Client","doc":"Class for making SPARQL queries using the SPARQL 1.1 Protocol"},
                                {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method___construct","name":"EasyRdf\\Sparql\\Client::__construct","doc":"Create a new SPARQL endpoint client"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_getQueryUri","name":"EasyRdf\\Sparql\\Client::getQueryUri","doc":"Get the URI of the SPARQL query endpoint"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_getUpdateUri","name":"EasyRdf\\Sparql\\Client::getUpdateUri","doc":"Get the URI of the SPARQL update endpoint"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_getUri","name":"EasyRdf\\Sparql\\Client::getUri","doc":""},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_query","name":"EasyRdf\\Sparql\\Client::query","doc":"Make a query to the SPARQL endpoint"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_countTriples","name":"EasyRdf\\Sparql\\Client::countTriples","doc":"Count the number of triples in a SPARQL 1.1 endpoint"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_listNamedGraphs","name":"EasyRdf\\Sparql\\Client::listNamedGraphs","doc":"Get a list of named graphs from a SPARQL 1.1 endpoint"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_update","name":"EasyRdf\\Sparql\\Client::update","doc":"Make an update request to the SPARQL endpoint"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_insert","name":"EasyRdf\\Sparql\\Client::insert","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_updateData","name":"EasyRdf\\Sparql\\Client::updateData","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_clear","name":"EasyRdf\\Sparql\\Client::clear","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_request","name":"EasyRdf\\Sparql\\Client::request","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_convertToTriples","name":"EasyRdf\\Sparql\\Client::convertToTriples","doc":null},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_preprocessQuery","name":"EasyRdf\\Sparql\\Client::preprocessQuery","doc":"Adds missing prefix-definitions to the query"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_executeQuery","name":"EasyRdf\\Sparql\\Client::executeQuery","doc":"Build http-client object, execute request and return a response"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_parseResponseToQuery","name":"EasyRdf\\Sparql\\Client::parseResponseToQuery","doc":"Parse HTTP-response object into a meaningful result-object."},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Client","fromLink":"EasyRdf/Sparql/Client.html","link":"EasyRdf/Sparql/Client.html#method_setHeaders","name":"EasyRdf\\Sparql\\Client::setHeaders","doc":"Proxy function to allow usage of our Client as well as Zend\\Http v2."},
            
                                                {"type":"Class","fromName":"EasyRdf\\Sparql","fromLink":"EasyRdf/Sparql.html","link":"EasyRdf/Sparql/Result.html","name":"EasyRdf\\Sparql\\Result","doc":"Class for returned for SPARQL SELECT and ASK query responses."},
                                {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method___construct","name":"EasyRdf\\Sparql\\Result::__construct","doc":"Create a new SPARQL Result object"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_getType","name":"EasyRdf\\Sparql\\Result::getType","doc":"Get the query result type (boolean/bindings)"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_getBoolean","name":"EasyRdf\\Sparql\\Result::getBoolean","doc":"Return the boolean value of the query result"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_isTrue","name":"EasyRdf\\Sparql\\Result::isTrue","doc":"Return true if the result of the query was true."},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_isFalse","name":"EasyRdf\\Sparql\\Result::isFalse","doc":"Return false if the result of the query was false."},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_numFields","name":"EasyRdf\\Sparql\\Result::numFields","doc":"Return the number of fields in a query result of type bindings."},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_numRows","name":"EasyRdf\\Sparql\\Result::numRows","doc":"Return the number of rows in a query result of type bindings."},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_getFields","name":"EasyRdf\\Sparql\\Result::getFields","doc":"Get the field names in a query result of type bindings."},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_dump","name":"EasyRdf\\Sparql\\Result::dump","doc":"Return a human readable view of the query result."},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_newTerm","name":"EasyRdf\\Sparql\\Result::newTerm","doc":"Create a new EasyRdf\\Resource or EasyRdf\\Literal depending\n on the type of data passed in."},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_startElementHandler","name":"EasyRdf\\Sparql\\Result::startElementHandler","doc":"XML Result Parser: this function is called when an XML element starts"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_textHandler","name":"EasyRdf\\Sparql\\Result::textHandler","doc":"XML Result Parser: this function is called when text is encountered"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_endElementHandler","name":"EasyRdf\\Sparql\\Result::endElementHandler","doc":"XML Result Parser: this function is called when an XML element ends"},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_parseXml","name":"EasyRdf\\Sparql\\Result::parseXml","doc":"Parse a SPARQL result in the XML format into the object."},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method_parseJson","name":"EasyRdf\\Sparql\\Result::parseJson","doc":"Parse a SPARQL result in the JSON format into the object."},
        {"type":"Method","fromName":"EasyRdf\\Sparql\\Result","fromLink":"EasyRdf/Sparql/Result.html","link":"EasyRdf/Sparql/Result.html#method___toString","name":"EasyRdf\\Sparql\\Result::__toString","doc":"Magic method to return value of the result to string"},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/TypeMapper.html","name":"EasyRdf\\TypeMapper","doc":"Class to map between RDF Types and PHP Classes"},
                                {"type":"Method","fromName":"EasyRdf\\TypeMapper","fromLink":"EasyRdf/TypeMapper.html","link":"EasyRdf/TypeMapper.html#method_get","name":"EasyRdf\\TypeMapper::get","doc":"Get the registered class for an RDF type"},
        {"type":"Method","fromName":"EasyRdf\\TypeMapper","fromLink":"EasyRdf/TypeMapper.html","link":"EasyRdf/TypeMapper.html#method_set","name":"EasyRdf\\TypeMapper::set","doc":"Register an RDF type with a PHP Class name"},
        {"type":"Method","fromName":"EasyRdf\\TypeMapper","fromLink":"EasyRdf/TypeMapper.html","link":"EasyRdf/TypeMapper.html#method_delete","name":"EasyRdf\\TypeMapper::delete","doc":"Delete an existing RDF type mapping."},
        {"type":"Method","fromName":"EasyRdf\\TypeMapper","fromLink":"EasyRdf/TypeMapper.html","link":"EasyRdf/TypeMapper.html#method_getDefaultResourceClass","name":"EasyRdf\\TypeMapper::getDefaultResourceClass","doc":""},
        {"type":"Method","fromName":"EasyRdf\\TypeMapper","fromLink":"EasyRdf/TypeMapper.html","link":"EasyRdf/TypeMapper.html#method_setDefaultResourceClass","name":"EasyRdf\\TypeMapper::setDefaultResourceClass","doc":"Sets the default resource class"},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/Utils.html","name":"EasyRdf\\Utils","doc":"Class containing static utility functions"},
                                {"type":"Method","fromName":"EasyRdf\\Utils","fromLink":"EasyRdf/Utils.html","link":"EasyRdf/Utils.html#method_camelise","name":"EasyRdf\\Utils::camelise","doc":"Convert a string into CamelCase"},
        {"type":"Method","fromName":"EasyRdf\\Utils","fromLink":"EasyRdf/Utils.html","link":"EasyRdf/Utils.html#method_isAssociativeArray","name":"EasyRdf\\Utils::isAssociativeArray","doc":"Check if something is an associative array"},
        {"type":"Method","fromName":"EasyRdf\\Utils","fromLink":"EasyRdf/Utils.html","link":"EasyRdf/Utils.html#method_removeFragmentFromUri","name":"EasyRdf\\Utils::removeFragmentFromUri","doc":"Remove the fragment from a URI (if it has one)"},
        {"type":"Method","fromName":"EasyRdf\\Utils","fromLink":"EasyRdf/Utils.html","link":"EasyRdf/Utils.html#method_dumpResourceValue","name":"EasyRdf\\Utils::dumpResourceValue","doc":"Return pretty-print view of a resource URI"},
        {"type":"Method","fromName":"EasyRdf\\Utils","fromLink":"EasyRdf/Utils.html","link":"EasyRdf/Utils.html#method_dumpLiteralValue","name":"EasyRdf\\Utils::dumpLiteralValue","doc":"Return pretty-print view of a literal"},
        {"type":"Method","fromName":"EasyRdf\\Utils","fromLink":"EasyRdf/Utils.html","link":"EasyRdf/Utils.html#method_parseMimeType","name":"EasyRdf\\Utils::parseMimeType","doc":"Clean up and split a mime-type up into its parts"},
        {"type":"Method","fromName":"EasyRdf\\Utils","fromLink":"EasyRdf/Utils.html","link":"EasyRdf/Utils.html#method_execCommandPipe","name":"EasyRdf\\Utils::execCommandPipe","doc":"Execute a command as a pipe"},
            
                                                {"type":"Class","fromName":"EasyRdf","fromLink":"EasyRdf.html","link":"EasyRdf/XMLParser.html","name":"EasyRdf\\XMLParser","doc":"Utility class for parsing XML documents"},
                                {"type":"Method","fromName":"EasyRdf\\XMLParser","fromLink":"EasyRdf/XMLParser.html","link":"EasyRdf/XMLParser.html#method_parse","name":"EasyRdf\\XMLParser::parse","doc":"Parse an XML string. Calls the callback methods\n when various nodes of an XML document are encountered"},
        {"type":"Method","fromName":"EasyRdf\\XMLParser","fromLink":"EasyRdf/XMLParser.html","link":"EasyRdf/XMLParser.html#method_path","name":"EasyRdf\\XMLParser::path","doc":"Returns the current path in the XML document as a string with slashes"},
        {"type":"Method","fromName":"EasyRdf\\XMLParser","fromLink":"EasyRdf/XMLParser.html","link":"EasyRdf/XMLParser.html#method_depth","name":"EasyRdf\\XMLParser::depth","doc":"Returns the current element depth of the path in the XML document"},
            
                                // Fix trailing commas in the index
        {}
    ];

    /** Tokenizes strings by namespaces and functions */
    function tokenizer(term) {
        if (!term) {
            return [];
        }

        var tokens = [term];
        var meth = term.indexOf('::');

        // Split tokens into methods if "::" is found.
        if (meth > -1) {
            tokens.push(term.substr(meth + 2));
            term = term.substr(0, meth - 2);
        }

        // Split by namespace or fake namespace.
        if (term.indexOf('\\') > -1) {
            tokens = tokens.concat(term.split('\\'));
        } else if (term.indexOf('_') > 0) {
            tokens = tokens.concat(term.split('_'));
        }

        // Merge in splitting the string by case and return
        tokens = tokens.concat(term.match(/(([A-Z]?[^A-Z]*)|([a-z]?[^a-z]*))/g).slice(0,-1));

        return tokens;
    };

    root.Doctum = {
        /**
         * Cleans the provided term. If no term is provided, then one is
         * grabbed from the query string "search" parameter.
         */
        cleanSearchTerm: function(term) {
            // Grab from the query string
            if (typeof term === 'undefined') {
                var name = 'search';
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
                var results = regex.exec(location.search);
                if (results === null) {
                    return null;
                }
                term = decodeURIComponent(results[1].replace(/\+/g, " "));
            }

            return term.replace(/<(?:.|\n)*?>/gm, '');
        },

        /** Searches through the index for a given term */
        search: function(term) {
            // Create a new search index if needed
            if (!bhIndex) {
                bhIndex = new Bloodhound({
                    limit: 500,
                    local: searchIndex,
                    datumTokenizer: function (d) {
                        return tokenizer(d.name);
                    },
                    queryTokenizer: Bloodhound.tokenizers.whitespace
                });
                bhIndex.initialize();
            }

            results = [];
            bhIndex.get(term, function(matches) {
                results = matches;
            });

            if (!rootPath) {
                return results;
            }

            // Fix the element links based on the current page depth.
            return $.map(results, function(ele) {
                if (ele.link.indexOf('..') > -1) {
                    return ele;
                }
                ele.link = rootPath + ele.link;
                if (ele.fromLink) {
                    ele.fromLink = rootPath + ele.fromLink;
                }
                return ele;
            });
        },

        /** Get a search class for a specific type */
        getSearchClass: function(type) {
            return searchTypeClasses[type] || searchTypeClasses['_'];
        },

        /** Add the left-nav tree to the site */
        injectApiTree: function(ele) {
            ele.html(treeHtml);
        }
    };

    $(function() {
        // Modify the HTML to work correctly based on the current depth
        rootPath = $('body').attr('data-root-path');
        treeHtml = treeHtml.replace(/href="/g, 'href="' + rootPath);
        Doctum.injectApiTree($('#api-tree'));
    });

    return root.Doctum;
})(window);

$(function() {

    
    
        // Toggle left-nav divs on click
        $('#api-tree .hd span').on('click', function() {
            $(this).parent().parent().toggleClass('opened');
        });

        // Expand the parent namespaces of the current page.
        var expected = $('body').attr('data-name');

        if (expected) {
            // Open the currently selected node and its parents.
            var container = $('#api-tree');
            var node = $('#api-tree li[data-name="' + expected + '"]');
            // Node might not be found when simulating namespaces
            if (node.length > 0) {
                node.addClass('active').addClass('opened');
                node.parents('li').addClass('opened');
                var scrollPos = node.offset().top - container.offset().top + container.scrollTop();
                // Position the item nearer to the top of the screen.
                scrollPos -= 200;
                container.scrollTop(scrollPos);
            }
        }

    
    
        var form = $('#search-form .typeahead');
        form.typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        }, {
            name: 'search',
            displayKey: 'name',
            source: function (q, cb) {
                cb(Doctum.search(q));
            }
        });

        // The selection is direct-linked when the user selects a suggestion.
        form.on('typeahead:selected', function(e, suggestion) {
            window.location = suggestion.link;
        });

        // The form is submitted when the user hits enter.
        form.keypress(function (e) {
            if (e.which == 13) {
                $('#search-form').submit();
                return true;
            }
        });

    
});



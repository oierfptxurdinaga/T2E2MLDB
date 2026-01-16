<?xml version="1.0" encoding="UTF-8"?>
<!-- Sailkapen taula transformatzeko XSLT-a -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <table class="standings-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Taldea</th>
          <th>JP</th>
          <th>I</th>
          <th>B</th>
          <th>G</th>
          <th>GD</th>
          <th>Pnt</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sailkapena/errenkada">
          <tr class="standings-row">
            <xsl:if test="posizioa &lt;= 2">
              <xsl:attribute name="class">standings-row top-two</xsl:attribute>
            </xsl:if>
            <xsl:if test="posizioa = 6">
              <xsl:attribute name="class">standings-row last</xsl:attribute>
            </xsl:if>
            <td class="position"><xsl:value-of select="posizioa"/></td>
            <td class="team-cell">
              <img src="{irudia}" alt="{taldea}" class="standings-img"/>
              <span><xsl:value-of select="taldea"/></span>
            </td>
            <td><xsl:value-of select="jp"/></td>
            <td><xsl:value-of select="i"/></td>
            <td><xsl:value-of select="b"/></td>
            <td><xsl:value-of select="g"/></td>
            <td><xsl:value-of select="gd"/></td>
            <td class="points"><xsl:value-of select="pnt"/></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>
</xsl:stylesheet>
